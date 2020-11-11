import { GraphQLUpload } from 'apollo-upload-server';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateBusinessInput } from '../inputs/BusinessInputs/UpdateBusinessInput';
import { getUserId } from '../services/getonlonlineuser-service';
import { uploadFileToBlob } from '../services/storageblob-service';
import { Business } from './../entity/Business';
import { Restaurant } from './../entity/Restaurant';
import { CreateBusinessInput } from './../inputs/BusinessInputs/CreateBusinessInput';
import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class BusinessResolver {
  @Query(() => [Business])
  public async getBusiness(@Arg('id') id?: string) {
    let restaurants;
    let business;
    if (id) {
      business = await Business.find({ where: { id } });
      if (business.length > 0) {
        restaurants = await Restaurant.find({ where: { businessId: id } });
        business[0].restaurants = restaurants;
        return business;
      }
    }

    business = await Business.find();
    for (const data of business) {
      data.restaurants = await Restaurant.find({ where: { businessId: data.id } });
    }

    return business;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async createBusiness(@Arg('data') data: CreateBusinessInput) {
    const restaurant = Business.create(data);
    restaurant.isDeleted = false;
    restaurant.isActive = true;
    restaurant.createdBy = getUserId();
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async updateBusiness(@Arg('id') id: string, @Arg('data') data: UpdateBusinessInput) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = getUserId();

    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware, GetUserMiddleware)
  public async activateBusiness(@Arg('id') id: string) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    restaurant.isActive = true;
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = getUserId();
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
        const business = await Business.findOne({ where: { id } });
        const result: any = await uploadFileToBlob(
          `business/${business.id}`,
          chunk,
          `logoimage.${ext[ext.length - 1]}`
        );
        business.logoImageUrl = result.url;
        await business.save();
      }, 3000);
    });

    return 'File Uploaded';
  }
}
