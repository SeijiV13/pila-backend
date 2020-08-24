import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateUserQueueInput {
  @Field()
  public restaurantId: string;

  @Field(() => String)
  public mobileNumber: string;

  @Field(() => String)
  public type: string;
}
