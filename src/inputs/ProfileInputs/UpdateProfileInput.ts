import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProfileInput {
  @Field()
  public firstName: string;
  @Field()
  public middleName: string;
  @Field()
  public lastName: string;
  @Field({ nullable: true })
  public dateOfBirth: string;
  @Field({ nullable: true })
  public gender: string;
  @Field({ nullable: true})
  public mobileNumber: string;
  @Field({ nullable: true})
  public country: string;
  @Field({ nullable: true})
  public state: string;
  @Field({ nullable: true})
  public city: string;
  @Field({ nullable: true})
  public zipCode: string;
}
