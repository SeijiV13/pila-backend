import { Query, Resolver } from 'type-graphql';
import { Ambiance } from './../object-types/Ambiance';
import { Cuisine } from './../object-types/Cuisine';

@Resolver()
export class AmbianceResolver {
  @Query(() => [Ambiance])
  public async getAmbiances() {
    const restaurantTypes: Ambiance[] = [
      { description: 'Casual & Low Key' },
      { description: 'Family Friendly' },
      { description: 'Formal & Fancy' },
      { description: 'Hip & Happening' },
      { description: 'Quite & Cosy ' },
      { description: 'Romantic' },
    ];

    return restaurantTypes;
  }
}
