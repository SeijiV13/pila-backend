import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateBusinessOwnerInput } from '../inputs/BusinessOwnerInputs/UpdateBusinessOwnerInput';
import { BusinessOwner } from './../entity/BusinessOwner';
import { CreateBusinessOwnerInput } from './../inputs/BusinessOwnerInputs/CreateBusinessOwnerInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class BusinessOwnerResolver {
  @Query(() => [BusinessOwner])
  public async getBusinessOwner(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await BusinessOwner.find({ where: { id } });
      return restaurant;
    }

    restaurant = await BusinessOwner.find();

    return restaurant;
  }

  @Mutation(() => BusinessOwner)
  @UseMiddleware(JwtMiddleware)
  public async createBusinessOwner(@Arg('data') data: CreateBusinessOwnerInput) {
    const restaurant = BusinessOwner.create(data);
    restaurant.isDeleted = false;
    restaurant.isActive = true;
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => BusinessOwner)
  @UseMiddleware(JwtMiddleware)
  public async updateBusinessOwner(
    @Arg('id') id: string,
    @Arg('data') data: UpdateBusinessOwnerInput
  ) {
    const restaurant = await BusinessOwner.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('BusinessOwner not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }
}
