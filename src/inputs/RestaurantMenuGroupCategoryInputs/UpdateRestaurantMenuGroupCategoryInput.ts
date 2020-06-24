import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateRestaurantMenuGroupCategoryInput {
  @Field()
  public restaurantId: string;

  @Field()
  public groupName: string;
}
