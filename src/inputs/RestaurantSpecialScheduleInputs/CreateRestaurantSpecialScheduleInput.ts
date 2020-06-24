import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantSpecialScheduleInput {
  @Field()
  public restaurantId: string;

  @Field()
  public scheduledDate: Date;

  @Field()
  public openTime: string;

  @Field()
  public closingTime: string;

  @Field()
  public isWholeDay: boolean;
}
