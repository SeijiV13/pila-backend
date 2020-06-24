import { Query, Resolver } from 'type-graphql';
import { Cuisine } from './../object-types/Cuisine';

@Resolver()
export class CuisineResolver {
  @Query(() => [Cuisine])
  public async getCuisines() {
    const restaurantTypes: Cuisine[] = [
      { description: 'American' },
      { description: 'Chinese' },
      { description: 'Filipino' },
      { description: 'Indian' },
      { description: 'Japanese' },
      { description: 'Mexican' },
      { description: 'Singaporean' },
      { description: 'Thai' },
    ];

    return restaurantTypes;
  }
}
