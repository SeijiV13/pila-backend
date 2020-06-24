import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantMenuGroupInput {
  @Field()
  public menuId: string;

  @Field()
  public groupId: string;
}
