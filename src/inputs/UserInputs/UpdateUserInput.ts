import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  public email: string;

  @Field({ nullable: false })
  public username: string;

  @Field({ nullable: false })
  public password: string;
}
