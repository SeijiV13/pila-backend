import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  public businessId: string;

  @Field()
  public name: string;

  @Field()
  public description: string;

  @Field()
  public type: string;

  @Field()
  public cuisines: string;

  @Field()
  public ambience: string;

  @Field()
  public seatingType: string;

  @Field()
  public imageUrl: string;

  @Field()
  public hasSmokingArea: boolean;

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

  @Field()
  public longitudes: number;

  @Field()
  public latitudes: number;
}
