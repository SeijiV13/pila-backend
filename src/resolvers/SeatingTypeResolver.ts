import { Query, Resolver } from 'type-graphql';
import { SeatingType } from '../object-types/SeatingType';
import { Cuisine } from './../object-types/Cuisine';

@Resolver()
export class SeatingTypeResolver {
  @Query(() => [Cuisine])
  public async getSeatingTypes() {
    const seatingTypes: SeatingType[] = [
      { description: 'I Prefer Indoor Type' },
      { description: 'I Prefer Outdoor Type' },
      // tslint:disable-next-line: prettier
      { description: 'I don\'t mind at all' },
    ];

    return seatingTypes;
  }
}
