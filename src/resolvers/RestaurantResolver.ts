import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UpdateRestaurantInput } from '../inputs/RestaurantInputs/UpdateRestaurantInput';
import { Restaurant } from './../entity/Restaurant';
import { CreateRestaurantInput } from './../inputs/RestaurantInputs/CreateRestaurantInput';

@Resolver()
export class RestaurantResolver {
  @Query(() => [Restaurant])
  public async getRestaurants(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await Restaurant.find({ where: { id } });
      return restaurant;
    }

    restaurant = await Restaurant.find();

    return restaurant;
  }

  @Mutation(() => Restaurant)
  public async createRestaurant(@Arg('data') data: CreateRestaurantInput) {
    const restaurant = Restaurant.create(data);
    restaurant.isDeleted = false;
    restaurant.isApproved = true;
    restaurant.isActive = true;
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => Restaurant)
  public async updateRestaurant(@Arg('id') id: string, @Arg('data') data: UpdateRestaurantInput) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }
}
