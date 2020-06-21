import { Field, InputType } from 'type-graphql';
import { BaseEntity, Column } from 'typeorm';

@InputType()
export class UpdateBusinessOwnerInput {
  @Field()
  public businessId: string;

  @Field()
  public userId: string;
}
