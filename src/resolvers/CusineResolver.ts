import { Query, Resolver } from 'type-graphql';
import { Cuisine } from './../object-types/Cuisine';

@Resolver()
export class CuisineResolver {
  @Query(() => [Cuisine])
  public async getCuisines() {
    const restaurantTypes: Cuisine[] = [
      {
        description: 'American',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/American-01.png',
      },
      {
        description: 'Chinese',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Chinese-01.png',
      },
      {
        description: 'Filipino',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Filipino-01.png',
      },
      {
        description: 'French',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/French-01.png',
      },
      {
        description: 'Greek',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Greek-01.png',
      },
      {
        description: 'Indian',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Indian-01.png',
      },
      {
        description: 'Italian',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/italian.png',
      },
      {
        description: 'Japanese',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Japanese-01.png',
      },
      {
        description: 'Korean',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Korean-01.png',
      },
      {
        description: 'Mexican',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Mexican-01.png',
      },
      {
        description: 'Middle Eastern',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Middle Eastern-01.png',
      },
      {
        description: 'Singaporean',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Singaporean-01.png',
      },
      {
        description: 'Soul Food',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Soul Food-01.png',
      },
      {
        description: 'Thai',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Thai-01.png',
      },
      {
        description: 'Spanish',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/spanish.png',
      },
      {
        description: 'Vegetarian',
        thumbnail: 'https://pilastorage.blob.core.windows.net/images/cuisine/Vegetarian-01.png',
      },
    ];

    return restaurantTypes;
  }
}
