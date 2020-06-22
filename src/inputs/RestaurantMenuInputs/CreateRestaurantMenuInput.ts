import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantMenuInput {
  @Field()
  public restaurantId: string;

  @Field(() => String)
  public menuName: string;

  @Field()
  public description: string;

  @Field()
  public price: number;

  @Field()
  public menuType: string;
}
