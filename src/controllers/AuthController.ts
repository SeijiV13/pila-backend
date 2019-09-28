import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import config from '../config/config';
import { User } from '../entity/User';
import { Profile } from './../entity/Profile';

class AuthController {
  public static login = async (req: Request, res: Response) => {
    // Check if username and password are set
    const { username, password, fbId, firstName, lastName, profileImageUrl, email } = req.body;
    // Get user and profile from database
    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);
    // for fb login
    if (fbId) {
      const fbUserExist = await userRepository.findOne({ where: { fbId } });

      if (fbUserExist) {
        const existFbUser = new User();
        existFbUser.lastLoggedIn = new Date();
        AuthController.signJwt(fbUserExist, userRepository, res);
        return;
      }
      const newFbUser = new User();
      const newFbprofile = new Profile();
      newFbUser.fbId = fbId;
      newFbUser.email = email;
      newFbUser.username = '';
      newFbUser.isVerified = 0;
      newFbUser.status = 'Active';
      newFbUser.dateCreated = new Date();
      newFbUser.role = '';
      newFbprofile.firstName = firstName;
      newFbprofile.lastName = lastName;
      newFbprofile.profileImageUrl = profileImageUrl;

      await userRepository.save(newFbUser).then(async createdUser => {
        newFbprofile.userId = createdUser.id;
        await profileRepository.save(newFbprofile);
        AuthController.signJwt(createdUser, userRepository, res);
      });

      return;
    }

    // for user login only
    if (!(username && password)) {
      res.status(400).send();
    }

    let user: User;

    user = await userRepository.findOne({ where: { username } });
    if (!user) {
      user = await userRepository.findOne({ where: { email: username } });
      if (!user) {
        res.status(401).send();
        return;
      }
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    AuthController.signJwt(user, userRepository, res);
  };

  public static changePassword = async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };

  public static signJwt(user: User, userRepository, res) {
    // Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    let firstTimeLoggedIn = false;
    try {
      if (!user.lastLoggedIn) {
        firstTimeLoggedIn = true;
      }
      user.lastLoggedIn = new Date();
      userRepository.save(user);
    } catch (error) {
      res.status(401).send();
    }
    // Send the jwt in the response
    res.send({ jwt: token, firstTimeLoggedIn, lastLoggedIn: user.lastLoggedIn });
  }
}
export default AuthController;
