import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateBusinessInput {
  @Field()
  public name: string;
  @Field()
  public description: string;
}
