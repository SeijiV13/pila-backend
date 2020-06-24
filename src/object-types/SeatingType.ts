import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SeatingType {
  @Field(() => String)
  public description: string;
}
