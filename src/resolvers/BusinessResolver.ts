import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UpdateBusinessInput } from '../inputs/BusinessInputs/UpdateBusinessInput';
import { Business } from './../entity/Business';
import { CreateBusinessInput } from './../inputs/BusinessInputs/CreateBusinessInput';

@Resolver()
export class BusinessResolver {
  @Query(() => [Business])
  public async getBusiness(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await Business.find({ where: { id } });
      return restaurant;
    }

    restaurant = await Business.find();

    return restaurant;
  }

  @Mutation(() => Business)
  public async createBusiness(@Arg('data') data: CreateBusinessInput) {
    const restaurant = Business.create(data);
    restaurant.isDeleted = false;
    restaurant.isActive = true;
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => Business)
  public async updateBusiness(@Arg('id') id: string, @Arg('data') data: UpdateBusinessInput) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Business)
  public async activateBusiness(@Arg('id') id: string) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    restaurant.isActive = true;
    await restaurant.save();
    return restaurant;
  }
}
