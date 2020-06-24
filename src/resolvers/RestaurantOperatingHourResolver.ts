import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateRestaurantOperatingHourInput } from '../inputs/RestaurantOperatingHourInputs/UpdateRestaurantOperatingHourInput';
import { RestaurantOperatingHour } from './../entity/RestaurantOperatingHour';
import { CreateRestaurantOperatingHourInput } from './../inputs/RestaurantOperatingHourInputs/CreateRestaurantOperatingHourInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class RestaurantOperatingHourResolver {
  @Query(() => [RestaurantOperatingHour])
  public async getRestaurantOperatingHours(@Arg('id') id?: string) {
    let restaurant: RestaurantOperatingHour[];
    if (id) {
      restaurant = await RestaurantOperatingHour.find({ where: { id } });
      return restaurant;
    }

    restaurant = await RestaurantOperatingHour.find();

    return restaurant;
  }

  @Query(() => [RestaurantOperatingHour])
  public async getRestaurantOperatingHoursByRestaurant(@Arg('restaurantId') restaurantId: number) {
    let restaurant: RestaurantOperatingHour[];
    restaurant = await RestaurantOperatingHour.find({ where: { restaurantId } });
    return restaurant;
  }

  @Mutation(() => RestaurantOperatingHour)
  @UseMiddleware(JwtMiddleware)
  public async createRestaurantOperatingHour(
    @Arg('data') data: CreateRestaurantOperatingHourInput
  ) {
    const restaurant = RestaurantOperatingHour.create(data);
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => RestaurantOperatingHour)
  @UseMiddleware(JwtMiddleware)
  public async updateRestaurantOperatingHour(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantOperatingHourInput
  ) {
    const restaurant = await RestaurantOperatingHour.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('RestaurantOperatingHour not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }
}
