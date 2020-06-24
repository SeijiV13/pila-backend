import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateRestaurantMenuGroupInput } from '../inputs/RestaurantMenuGroupInputs/CreateRestaurantMenuGroupInput';
import { UpdateRestaurantMenuGroupInput } from '../inputs/RestaurantMenuGroupInputs/UpdateRestaurantMenuGroupInput';
import { getUserId } from '../services/getonlonlineuser-service';
import { RestaurantMenuGroup } from './../entity/RestaurantMenuGroup';
import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class RestaurantMenuGroupResolver {
  @Query(() => [RestaurantMenuGroup])
  public async getRestaurantMenuGroups(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await RestaurantMenuGroup.find({ where: { id } });
      return restaurant;
    }

    restaurant = await RestaurantMenuGroup.find();

    return restaurant;
  }

  @Query(() => [RestaurantMenuGroup])
  public async getRestaurantMenuGroupsByCategory(@Arg('groupId') groupId: string) {
    const restaurantMenu = await RestaurantMenuGroup.find({ where: { groupId } });
    return restaurantMenu;
  }

  @Query(() => [RestaurantMenuGroup])
  public async getRestaurantMenuGroupsByMenuItem(@Arg('menuId') menuId: string) {
    const restaurantMenu = await RestaurantMenuGroup.find({ where: { menuId } });
    return restaurantMenu;
  }

  @Mutation(() => RestaurantMenuGroup)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async createRestaurantMenuGroup(@Arg('data') data: CreateRestaurantMenuGroupInput) {
    const restaurant = RestaurantMenuGroup.create(data);
    restaurant.createdBy = getUserId();
    restaurant.createdDate = new Date();

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => RestaurantMenuGroup)
  @UseMiddleware(JwtMiddleware)
  public async updateRestaurantMenuGroup(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantMenuGroupInput
  ) {
    const restaurant = await RestaurantMenuGroup.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('RestaurantMenuGroup not found!');
    }
    Object.assign(restaurant, data);

    await restaurant.save();
    return restaurant;
  }
}
