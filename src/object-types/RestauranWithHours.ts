import { Field, ObjectType } from 'type-graphql';
import { RestaurantGallery } from '../entity/RestaurantGallery';
import { RestaurantOperatingHour } from '../entity/RestaurantOperatingHour';
import { Restaurant } from './../entity/Restaurant';

@ObjectType()
export class RestaurantWithHours extends Restaurant {
  @Field(() => [RestaurantOperatingHour], { nullable: true })
  public schedule: RestaurantOperatingHour;

  @Field(() => [RestaurantGallery], { nullable: true })
  public gallery: RestaurantGallery;

  @Field(() => Number, { nullable: true })
  public rating: number;

  @Field(() => Number, { nullable: true })
  public totalReviews: number;

  @Field(() => Number, { nullable: true })
  public averagePrice: number;
}
