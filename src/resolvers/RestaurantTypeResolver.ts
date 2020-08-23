import { Query, Resolver } from 'type-graphql';
import { RestaurantType } from './../object-types/RestaurantType';

@Resolver()
export class RestaurantTypeResolver {
  @Query(() => [RestaurantType])
  public async getRestaurantTypes() {
    const restaurantTypes: RestaurantType[] = [
      {
        description: 'Buffet',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/buffet.png',
      },
      {
        description: 'Cafe',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/cafe.jpg',
      },
      {
        description: 'Casual Dining',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/casual-dining.jpg',
      },
      {
        description: 'Contemporary Casual',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/contemporary-casual.jpg',
      },
      {
        description: 'Ethnic',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/cafe.jpg',
      },
      {
        description: 'Family Style',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/family-style.jpg',
      },
      {
        description: 'Fast Casual',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/fast-casual.jpg',
      },
      {
        description: 'Fast Food',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/fast-food.jpg',
      },
      {
        description: 'Fine Dining',
        thumbnail:
          'https://pilastorage.blob.core.windows.net/images/resto-type-mockup/fine-dining2.jpg',
      },
    ];

    return restaurantTypes;
  }
}
