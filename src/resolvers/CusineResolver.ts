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
      { description: 'French' },
      { description: 'Greek' },
      { description: 'Indian' },
      { description: 'Italian' },
      { description: 'Japanese' },
      { description: 'Korean' },
      { description: 'Mexican' },
      { description: 'Middle Eastern' },
      { description: 'Singaporean' },
      { description: 'Soul Food' },
      { description: 'Thai' },
      { description: 'Vegetarian' },
    ];

    return restaurantTypes;
  }
}
