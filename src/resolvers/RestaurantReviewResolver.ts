import { RestaurantReview } from './../entity/RestaurantReview';

import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateRestaurantReviewInput } from '../inputs/RestaurantReviewInputs.ts/CreateRestaurantReviewInput';
import { UpdateRestaurantReviewInput } from '../inputs/RestaurantReviewInputs.ts/UpdateRestaurantReviewInput';
import { TotalReviews } from '../object-types/TotalReviews';
import { getUserId } from '../services/getonlonlineuser-service';
import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';
@Resolver()
export class RestaurantReviewResolver {
  @Query(() => [RestaurantReview])
  public async getRestaurantReviews(@Arg('restaurantId') restaurantId?: string) {
    let restaurantReviews;
    if (restaurantId) {
      restaurantReviews = await RestaurantReview.find({ where: { restaurantId } });
      return restaurantReviews;
    }

    restaurantReviews = await RestaurantReview.find();

    return restaurantReviews;
  }

  @Query(() => TotalReviews)
  public async getRestaurantTotalReviews(@Arg('restaurantId') restaurantId?: string) {
    const reviewsTotal = await RestaurantReview.createQueryBuilder()
      .select('COUNT(*) as total')
      .where('restaurantId = :restaurantId', { restaurantId })
      .execute();
    const total = await RestaurantReview.createQueryBuilder()
      .select('SUM(rating) as total')
      .where('restaurantId = :restaurantId', { restaurantId })
      .execute();
    const totalReviews = new TotalReviews();
    totalReviews.total = reviewsTotal[0] ? reviewsTotal[0].total : 0;
    totalReviews.rating = reviewsTotal[0] ? total[0].total / reviewsTotal[0].total : 0;
    return totalReviews;
  }

  @Mutation(() => RestaurantReview)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async createRestaurantReviews(@Arg('data') data: CreateRestaurantReviewInput) {
    const restaurantReview = RestaurantReview.create(data);
    restaurantReview.userId = getUserId();
    restaurantReview.createdDate = new Date();

    await restaurantReview.save();

    return restaurantReview;
  }

  @Mutation(() => RestaurantReview)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async updateRestaurantReviews(
    @Arg('id') id: string,
    @Arg('data') data: UpdateRestaurantReviewInput
  ) {
    const restaurantReview = await RestaurantReview.findOne({ where: { id } });
    if (!restaurantReview) {
      throw new Error('Restaurant review not found!');
    }
    Object.assign(restaurantReview, data);
    await restaurantReview.save();

    return restaurantReview;
  }
}
