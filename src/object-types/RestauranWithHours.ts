import { Field, ObjectType } from 'type-graphql';
import { RestaurantOperatingHour } from '../entity/RestaurantOperatingHour';
import { Restaurant } from './../entity/Restaurant';

@ObjectType()
export class RestaurantWithHours extends Restaurant {
  @Field(() => [RestaurantOperatingHour], { nullable: true })
  public schedule: RestaurantOperatingHour;

  @Field(() => Number, { nullable: true })
  public rating: number;

  @Field(() => Number, { nullable: true })
  public totalReviews: number;

  @Field(() => Number, { nullable: true })
  public averagePrice: number;
}
