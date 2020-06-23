import { GraphQLUpload } from 'apollo-upload-server';
import { FileUpload } from 'graphql-upload';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateProfileInput } from '../inputs/ProfileInputs/UpdateProfileInput';
import { uploadFileToBlob } from '../services/storageblob-service';
import { Profile } from './../entity/Profile';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';
@Resolver()
export class ProfileResolver {
  @Query(() => Profile)
  @UseMiddleware(JwtMiddleware)
  public async getProfile(@Arg('id') id: string) {
    const profile = await Profile.findOne({ where: { userId: id } });
    if (!profile) {
      throw new Error('Profile not found!');
    }
    return profile;
  }

  @Mutation(() => Profile)
  @UseMiddleware(JwtMiddleware)
  public async updateProfile(@Arg('id') id: string, @Arg('data') data: UpdateProfileInput) {
    const profile = await Profile.findOne({ where: { userId: id } });

    if (!profile) {
      throw new Error('Profile not found!');
    }
    Object.assign(profile, data);
    profile.save();
    await profile.save();
    return profile;
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
        const profile = await Profile.findOne({ where: { userId: id } });
        const result: any = uploadFileToBlob(
          `profile/${profile.id}`,
          chunk,
          `profilepic.${ext[ext.length - 1]}`
        );
        profile.profileImageUrl = result.url;
        await profile.save();
      }, 3000);
    });

    return 'File Uploaded';
  }
}
