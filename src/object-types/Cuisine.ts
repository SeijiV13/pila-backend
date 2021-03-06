import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Cuisine {
  @Field(() => String)
  public description: string;

  @Field(() => String)
  public thumbnail: string;
}
