import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Token {
  @Field()
  public token: string;
}
