import { GraphQLUpload } from 'apollo-upload-server';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateBusinessInput } from '../inputs/BusinessInputs/UpdateBusinessInput';
import { uploadFileToBlob } from '../services/storageblob-service';
import { Business } from './../entity/Business';
import { CreateBusinessInput } from './../inputs/BusinessInputs/CreateBusinessInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class BusinessResolver {
  @Query(() => [Business])
  public async getBusiness(@Arg('id') id?: string) {
    let restaurant;
    if (id) {
      restaurant = await Business.find({ where: { id } });
      return restaurant;
    }

    restaurant = await Business.find();

    return restaurant;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware)
  public async createBusiness(@Arg('data') data: CreateBusinessInput) {
    const restaurant = Business.create(data);
    restaurant.isDeleted = false;
    restaurant.isActive = true;
    restaurant.createdBy = 'test';
    restaurant.createdDate = new Date();
    restaurant.updatedDate = null;
    restaurant.updatedBy = null;

    await restaurant.save();

    return restaurant;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware)
  public async updateBusiness(@Arg('id') id: string, @Arg('data') data: UpdateBusinessInput) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    Object.assign(restaurant, data);
    restaurant.updatedDate = new Date();
    restaurant.updatedBy = 'test';

    await restaurant.save();
    return restaurant;
  }

  @Mutation(() => Business)
  @UseMiddleware(JwtMiddleware)
  public async activateBusiness(@Arg('id') id: string) {
    const restaurant = await Business.findOne({ where: { id } });

    if (!restaurant) {
      throw new Error('Business not found!');
    }
    restaurant.isActive = true;
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
