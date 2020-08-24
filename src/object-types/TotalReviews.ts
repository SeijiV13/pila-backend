import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TotalReviews {
  @Field(() => Number)
  public total: number;

  @Field(() => Number)
  public rating: number;
}
