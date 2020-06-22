import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantMenuGroupCategoryInput {
  @Field()
  public restaurantId: string;

  @Field()
  public groupName: string;
}
