import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantMenuInput {
  @Field()
  public restaurantId: string;

  @Field()
  public menuName: string;

  @Field()
  public description: string;

  @Field()
  public price: number;

  @Field()
  public menuType: string;
}
