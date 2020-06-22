import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateRestaurantMenuInput } from '../inputs/RestaurantMenuInputs/CreateRestaurantMenuInput';
import { UpdateRestaurantMenuInput } from '../inputs/RestaurantMenuInputs/UpdateRestaurantMenuInput';
import { RestaurantMenu } from './../entity/RestaurantMenu';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class RestaurantMenuResolver {
  @Query(() => [RestaurantMenu])
  public async getRestaurantMenus(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await RestaurantMenu.find({ where: { id } });
      return restaurant;
    }

    restaurant = await RestaurantMenu.find();

    return restaurant;
  }

  @Query(() => [RestaurantMenu])
  public async getRestaurantMenusByRestau(@Arg('restaurantId') restaurantId: string) {
    const restaurantMenu = await RestaurantMenu.find({ where: { restaurantId } });
    return restaurantMenu;
  }

  @Mutation(() => RestaurantMenu)
  @UseMiddleware(JwtMiddleware)
  public async createRestaurantMenu(@Arg('data') data: CreateRestaurantMenuInput) {
    const restaurant = RestaurantMenu.create(data);
    restaurant.isDeleted = false;
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => RestaurantMenu)
  @UseMiddleware(JwtMiddleware)
  public async updateRestaurantMenu(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantMenuInput
  ) {
    const restaurant = await RestaurantMenu.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('RestaurantMenu not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }
}
