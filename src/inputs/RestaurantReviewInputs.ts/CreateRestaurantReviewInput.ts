import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantReviewInput {
  @Field()
  public restaurantId: string;

  @Field()
  public rating: number;

  @Field()
  public comment: string;
}
