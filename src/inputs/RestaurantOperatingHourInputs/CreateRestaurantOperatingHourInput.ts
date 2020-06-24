import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantOperatingHourInput {
  @Field()
  public restaurantId: string;

  @Field()
  public openTime: string;

  @Field()
  public closingTime: string;

  @Field()
  public day: string;
}
