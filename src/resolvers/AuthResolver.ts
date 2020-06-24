import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Profile } from '../entity/Profile';
import { signJwt } from '../services/signjwt-service';
import { User } from './../entity/User';
import { LoginUserInput } from './../inputs/AuthInput/UserLoginInput';
import { Token } from './../models/Token';

@Resolver()
export class AuthResolver {
  @Query(() => Token)
  public async login(@Arg('data') data: LoginUserInput) {
    let foundUser = await User.findOne({ where: { username: data.username } });
    if (data.fbId) {
      const fbUserExist = await User.findOne({ where: { fbId: data.fbId } });
      if (fbUserExist) {
        return signJwt(fbUserExist);
      }
      const newFbUser = new User();
      const newFbprofile = new Profile();
      Object.assign(newFbUser, data);
      newFbUser.username = '';
      newFbUser.role = '';
      newFbUser.isVerified = true;
      newFbUser.status = 'Active';
      newFbUser.createdDate = new Date();

      await newFbprofile.save();
      newFbprofile.userId = newFbUser.id;
      newFbprofile.firstName = data.firstName;
      newFbprofile.lastName = data.lastName;

      await newFbprofile.save();
      return signJwt(newFbUser);
    }

    if (foundUser) {
      if (foundUser.checkIfUnencryptedPasswordIsValid(data.password)) {
        return signJwt(foundUser);
      }
    } else {
      // search email
      foundUser = await User.findOne({ where: { email: data.username } });
      if (foundUser) {
        if (foundUser.checkIfUnencryptedPasswordIsValid(data.password)) {
          return signJwt(foundUser);
        }
      }
    }

    throw new Error('You have entered an invalid username or password');
  }
}
