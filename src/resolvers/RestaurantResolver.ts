import { GraphQLUpload } from 'apollo-upload-server';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Like } from 'typeorm';
import { RestaurantMenu } from '../entity/RestaurantMenu';
import { RestaurantOperatingHour } from '../entity/RestaurantOperatingHour';
import { UpdateRestaurantInput } from '../inputs/RestaurantInputs/UpdateRestaurantInput';
import { restaurantQueries } from '../queries/restaurant.queries';
import { distance } from '../services/computedistance-service';
import { getUserId } from '../services/getonlonlineuser-service';
import { uploadFileToBlob } from '../services/storageblob-service';
import { Restaurant } from './../entity/Restaurant';
import { CreateRestaurantInput } from './../inputs/RestaurantInputs/CreateRestaurantInput';
import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';
import { RestaurantWithHours } from './../object-types/RestauranWithHours';
@Resolver()
export class RestaurantResolver {
  // queryBuilders
  public async restaurantQuery(id?: string) {
    let restaurant;
    const restaurantBuilder = await Restaurant.createQueryBuilder().select(
      restaurantQueries.selectRestaurant
    );
    if (id) {
      restaurant = await restaurantBuilder.where('id = :id', { id }).execute();
    } else {
      restaurant = await restaurantBuilder.execute();
    }
    for (const data of restaurant) {
      data.schedule = await RestaurantOperatingHour.createQueryBuilder()
        .select(
          'RestaurantOperatingHour.openTime as openTime, RestaurantOperatingHour.closingTime as closingTime, RestaurantOperatingHour.day as day'
        )
        .where(`RestaurantOperatingHour.restaurantId = :id`, { id: data.id })
        .execute();
    }
    return restaurant;
  }

  // QUERIES
  @Query(() => [RestaurantWithHours])
  public async getRestaurants(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await this.restaurantQuery(id);
      return restaurant;
    }

    restaurant = await this.restaurantQuery();
    return restaurant;
  }

  @Query(() => [RestaurantWithHours])
  public async getNearRestaurants(@Arg('lat') lat: number, @Arg('long') long: number) {
    let restaurant: RestaurantWithHours[];
    restaurant = await this.restaurantQuery();
    // filter near restaurants
    return restaurant.filter(
      data => distance(lat, long, data.latitudes, data.longitudes, 'K') <= 5
    );
  }

  @Query(() => [Restaurant])
  public async getRestaurantsByCuisine(@Arg('cuisines') cuisines: string) {
    let restaurant: Restaurant[];
    restaurant = await Restaurant.find({ where: { cuisines: Like(`%${cuisines}%`) } });

    // filter near restaurants
    return restaurant;
  }

  @Query(() => [Restaurant])
  public async getRestaurantsByKeywordsFilter(@Arg('keywords') keywords: string) {
    let restaurant: Restaurant[];
    restaurant = await Restaurant.find({
      where: [
        {
          cuisines: Like(`%${keywords}%`),
        },
        {
          description: Like(`%${keywords}%`),
        },
      ],
    });

    // filter near restaurants
    return restaurant;
  }

  @Query(() => [Restaurant])
  public async filterRestaurantsByOptionalFilters(
    @Arg('ambience') ambience: string,
    @Arg('seatingType') seatingType: string,
    @Arg('hasSmokingArea') hasSmokingArea: boolean,
    @Arg('name') name: string,
    @Arg('minPrice') minPrice: number,
    @Arg('maxPrice') maxPrice: number
  ) {
    let restaurant: Restaurant[];
    restaurant = await Restaurant.find({
      where: [
        {
          ambience: Like(`%${ambience}%`),
          hasSmokingArea,
          name: Like(`%${name}%`),
          seatingType: Like(`%${seatingType}%`),
        },
      ],
    });
    if (minPrice && maxPrice) {
      const withinPriceRange = await RestaurantMenu.createQueryBuilder()
        .select('RestaurantId, SUM(price) as price')
        .groupBy('RestaurantId')
        .having(`SUM(price) <= ${maxPrice} AND SUM(price) >= ${minPrice} `)
        .execute();

      const filteredByPrice = restaurant.filter(el => {
        return withinPriceRange.some(f => {
          return f.RestaurantId === el.id;
        });
      });
      return filteredByPrice;
    }

    // filter near restaurants
    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async createRestaurant(@Arg('data') data: CreateRestaurantInput) {
    const restaurant = Restaurant.create(data);
    restaurant.isDeleted = false;
    restaurant.isApproved = true;
    restaurant.isActive = true;
    restaurant.createdBy = getUserId();
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async updateRestaurant(@Arg('id') id: string, @Arg('data') data: UpdateRestaurantInput) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = getUserId();

    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async activateRestaurant(@Arg('id') id: string) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = getUserId();
    restaurant.isActive = true;
    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Restaurant)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async approveRestaurant(@Arg('id') id: string) {
    const restaurant = await Restaurant.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Restaurant not found!');
    }
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = getUserId();
    restaurant.isApproved = true;
    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => String)
  @UseMiddleware(JwtMiddleware)
  public async upload(@Arg('id') id: string, @Arg('file', type => GraphQLUpload) file) {
    // process upload
    const { filename, createReadStream } = file;
    const ext = filename.split('.');
    const test = createReadStream(filename);
    test.on('data', chunk => {
      setTimeout(async () => {
        const restaurant = await Restaurant.findOne({ where: { id } });
        const result: any = await uploadFileToBlob(
          `restaurant/${restaurant.id}`,
          chunk,
          `restaurant-image.${ext[ext.length - 1]}`
        );
        restaurant.imageUrl = result.url;
        await restaurant.save();
      }, 3000);
    });

    return 'File Uploaded';
  }
}
