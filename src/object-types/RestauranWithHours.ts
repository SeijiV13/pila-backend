import { Field, ObjectType } from 'type-graphql';
import { RestaurantOperatingHour } from '../entity/RestaurantOperatingHour';
import { Restaurant } from './../entity/Restaurant';

@ObjectType()
export class RestaurantWithHours extends Restaurant {
  @Field(() => String)
  public closingTime: string;

  @Field(() => String)
  public openTime: string;

  @Field(() => String)
  public day: string;

  @Field(() => Number)
  public rating: number;

  @Field(() => Number)
  public totalReviews: number;
}
