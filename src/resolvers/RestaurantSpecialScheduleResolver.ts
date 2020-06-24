import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateRestaurantSpecialScheduleInput } from '../inputs/RestaurantSpecialScheduleInputs/UpdateRestaurantSpecialScheduleInput';
import { RestaurantSpecialSchedule } from './../entity/RestaurantSpecialSchedule';
import { CreateRestaurantSpecialScheduleInput } from './../inputs/RestaurantSpecialScheduleInputs/CreateRestaurantSpecialScheduleInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class RestaurantSpecialScheduleResolver {
  @Query(() => [RestaurantSpecialSchedule])
  public async getRestaurantSpecialSchedules(@Arg('id') id?: string) {
    let restaurant: RestaurantSpecialSchedule[];
    if (id) {
      restaurant = await RestaurantSpecialSchedule.find({ where: { id } });
      return restaurant;
    }

    restaurant = await RestaurantSpecialSchedule.find();

    return restaurant;
  }

  @Query(() => [RestaurantSpecialSchedule])
  public async getRestaurantSpecialSchedulesByRestaurant(
    @Arg('restaurantId') restaurantId: number
  ) {
    let restaurant: RestaurantSpecialSchedule[];
    restaurant = await RestaurantSpecialSchedule.find({ where: { restaurantId } });
    return restaurant;
  }

  @Mutation(() => RestaurantSpecialSchedule)
  @UseMiddleware(JwtMiddleware)
  public async createRestaurantSpecialSchedule(
    @Arg('data') data: CreateRestaurantSpecialScheduleInput
  ) {
    const restaurant = RestaurantSpecialSchedule.create(data);
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => RestaurantSpecialSchedule)
  @UseMiddleware(JwtMiddleware)
  public async updateRestaurantSpecialSchedule(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantSpecialScheduleInput
  ) {
    const restaurant = await RestaurantSpecialSchedule.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('RestaurantSpecialSchedule not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }
}
