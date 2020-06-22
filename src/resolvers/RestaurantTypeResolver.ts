import { Query, Resolver } from 'type-graphql';
import { RestaurantType } from './../object-types/RestaurantType';

@Resolver()
export class RestaurantTypeResolver {
  @Query(() => [RestaurantType])
  public async getRestaurantTypes() {
    const restaurantTypes: RestaurantType[] = [
      { description: 'Buffet' },
      { description: 'Cafe' },
      { description: 'Casual Dining' },
      { description: 'Contemporary Casual' },
      { description: 'Ethnic' },
      { description: 'Family Style' },
      { description: 'Fast Casual' },
      { description: 'Fast Food' },
      { description: 'Fine Dining' },
    ];

    return restaurantTypes;
  }
}
