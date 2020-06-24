import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateRestaurantInput } from '../inputs/RestaurantInputs/UpdateRestaurantInput';
import { distance } from '../services/computedistance-service';
import { Restaurant } from './../entity/Restaurant';
import { CreateRestaurantInput } from './../inputs/RestaurantInputs/CreateRestaurantInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

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

  @Query(() => [Restaurant])
  public async getNearRestaurants(@Arg('lat') lat: number, @Arg('long') long: number) {
    let restaurant: Restaurant[];
    restaurant = await Restaurant.find();

    // filter near restaurants
    restaurant.filter(data => distance(lat, long, data.latitudes, data.longitudes, 'K') <= 5);

    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware)
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
  @UseMiddleware(JwtMiddleware)
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

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware)
  public async activateRestaurant(@Arg('id') id: string) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    restaurant.isActive = true;
    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware)
  public async approveRestaurant(@Arg('id') id: string) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    restaurant.isApproved = true;
    await restaurant.save();
    return restaurant;
  }
}
