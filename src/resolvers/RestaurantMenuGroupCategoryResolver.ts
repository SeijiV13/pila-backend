import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateRestaurantMenuGroupCategoryInput } from '../inputs/RestaurantMenuGroupCategoryInputs/CreateRestaurantMenuGroupCategoryInput';
import { UpdateRestaurantMenuGroupCategoryInput } from '../inputs/RestaurantMenuGroupCategoryInputs/UpdateRestaurantMenuGroupCategoryInput';
import { getUserId } from '../services/getonlonlineuser-service';
import { RestaurantMenuGroupCategory } from './../entity/RestaurantMenuGroupCategory';
import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class RestaurantMenuGroupCategoryResolver {
  @Query(() => [RestaurantMenuGroupCategory])
  public async getRestaurantMenuGroupCategories(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await RestaurantMenuGroupCategory.find({ where: { id } });
      return restaurant;
    }

    restaurant = await RestaurantMenuGroupCategory.find();

    return restaurant;
  }

  @Query(() => [RestaurantMenuGroupCategory])
  public async getRestaurantMenuGroupCategoryByRestaurant(
    @Arg('restaurantId') restaurantId: string
  ) {
    const restaurantMenu = await RestaurantMenuGroupCategory.find({ where: { restaurantId } });
    return restaurantMenu;
  }

  @Mutation(() => RestaurantMenuGroupCategory)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async createRestaurantMenuGroupCategory(
    @Arg('data') data: CreateRestaurantMenuGroupCategoryInput
  ) {
    const restaurant = RestaurantMenuGroupCategory.create(data);
    restaurant.createdBy = getUserId();
    restaurant.createdDate = new Date();

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => RestaurantMenuGroupCategory)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async updateRestaurantMenuGroupCategory(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantMenuGroupCategoryInput
  ) {
    const restaurant = await RestaurantMenuGroupCategory.findOne({ where: { id } });
    restaurant.updatedBy = getUserId();
    restaurant.updatedDate = new Date();
    if (!restaurant) {
      throw new Error('Restaurant menu group category not found!');
    }
    Object.assign(restaurant, data);

    await restaurant.save();
    return restaurant;
  }
}
