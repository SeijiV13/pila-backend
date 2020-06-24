import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginUserInput {
  @Field()
  public username: string;

  @Field()
  public password: string;

  @Field({ nullable: true })
  public fbId: string;

  @Field({ nullable: true })
  public firstName: string;
  @Field({ nullable: true })
  public lastName: string;
  @Field({ nullable: true })
  public email: string;
}
