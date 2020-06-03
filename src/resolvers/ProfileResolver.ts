import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UpdateProfileInput } from '../inputs/ProfileInputs/UpdateProfileInput';
import { Profile } from './../entity/Profile';

@Resolver()
export class ProfileResolver {
  @Query(() => Profile)
  public async getProfile(@Arg('id') id: string) {
    const profile = await Profile.findOne({ where: { userId: id } });
    if (!profile) {
      throw new Error('Profile not found!');
    }
    return profile;
  }

  @Mutation(() => Profile)
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
