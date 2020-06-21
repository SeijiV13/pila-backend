import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  public businessId: string;

  @Field()
  public description: string;

  @Field()
  public type: string;

  @Field()
  public address: string;

  @Field()
  public country: string;

  @Field()
  public state: string;

  @Field()
  public city: string;

  @Field()
  public zipCode: string;
}
