import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UpdateUserInput } from '../inputs/UserInputs/UpdateUserInput';
import { Profile } from './../entity/Profile';
import { User } from './../entity/User';
import { CreateUserInput } from './../inputs/UserInputs/CreateUserInput';
import { JwtMiddleware } from './../middlewares/JwtMiddleware';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(JwtMiddleware)
  public getUsers(@Arg('id') id: string) {
    if (id) {
      return User.find({ where: { id } });
    }
    return User.find();
  }

  @Mutation(() => User)
  public async createUser(@Arg('data') data: CreateUserInput) {
    const user = await User.create(data);
    const profile = await Profile.create({ firstName: '', middleName: '', lastName: '' });
    user.role = '';
    user.isVerified = true;
    user.status = 'Active';
    user.hashPassword();
    user.isLockedOut = false;
    user.createdBy = '';
    user.createdDate = new Date();

    const userEmailExist = await User.findOne({ where: { email: user.email } });
    const usernameExist = await User.findOne({ where: { username: user.username } });
    if (userEmailExist) {
      throw new Error('email already exists!');
    } else if (usernameExist) {
      throw new Error('username already exists!');
    }
    await user.save();

    profile.userId = user.id;
    profile.createdBy = '';
    profile.mobileNumber = '';
    profile.createdDate = new Date();
    await profile.save();
    return user;
  }

  @Mutation(() => User)
  @UseMiddleware(JwtMiddleware)
  public async updateUser(@Arg('id') id: string, @Arg('data') data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error('user not found!');
    }
    user.updatedBy = '';
    user.updatedDate = new Date();
    Object.assign(user, data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  public async deleteUser(@Arg('id') id: string) {
    const user = await User.delete(id);
    return user;
  }
}
