import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Ambiance {
  @Field(() => String)
  public description: string;
}
