import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateBusinessInput {
  @Field()
  public name: string;
  @Field()
  public description: string;
}
