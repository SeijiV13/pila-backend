import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateProfileInput } from '../inputs/ProfileInputs/UpdateProfileInput';
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
}
