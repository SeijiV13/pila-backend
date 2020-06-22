import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateRestaurantMenuGroupInput {
  @Field()
  public menuId: string;

  @Field()
  public groupId: string;
}
