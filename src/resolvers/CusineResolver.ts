import { Query, Resolver } from 'type-graphql';
import { Cuisine } from './../object-types/Cuisine';

@Resolver()
export class CuisineResolver {
  @Query(() => [Cuisine])
  public async getCuisines() {
    const restaurantTypes: Cuisine[] = [
      {
        description: 'American',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/american-foods.png',
      },
      {
        description: 'Chinese',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/chinese.png',
      },
      {
        description: 'Filipino',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/filipino.png',
      },
      {
        description: 'Indian',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/indian.png',
      },
      {
        description: 'Japanese',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/japanese.png',
      },
      {
        description: 'Mexican',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/american-foods.png',
      },
      {
        description: 'Singaporean',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/american-foods.png',
      },
      {
        description: 'Thai',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/thai.png',
      },
      {
        description: 'Italian',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/italian.png',
      },
      {
        description: 'Spanish',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/spanish.png',
      },
    ];

    return restaurantTypes;
  }
}
