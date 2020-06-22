import { Query, Resolver } from 'type-graphql';

@Resolver()
export class RestaurantTypeResolver {
  @Query(() => [String])
  public async getRestaurantTypes() {
    const restaurantTypes = [
      'Buffet',
      'Cafe',
      'Casual Dining',
      'Contemporary Casual',
      'Ethnic',
      'Family Style',
      'Fast Casual',
      'Fast Food',
      'Fine Dining',
    ];

    return restaurantTypes;
  }
}
