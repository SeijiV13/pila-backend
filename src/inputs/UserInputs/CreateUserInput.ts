import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  public email: string;

  @Field()
  public username: string;

  @Field()
  public password: string;
}
