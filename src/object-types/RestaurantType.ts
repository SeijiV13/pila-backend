import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RestaurantType {
  @Field(() => String)
  public description: string;

  @Field(() => String)
  public thumbnail: string;
}
