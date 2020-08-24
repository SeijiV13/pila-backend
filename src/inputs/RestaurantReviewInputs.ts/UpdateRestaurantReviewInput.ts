import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateRestaurantReviewInput {
  @Field()
  public rating: number;

  @Field()
  public comment: string;
}
