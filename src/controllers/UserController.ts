import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import messages from '../config/messages';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
class UserController {
  public static listAll = async (req: Request, res: Response) => {
    // Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'username', 'role'], // We dont want to send the passwords on response
    });

    // Send the users object
    res.send(users);
  };

  public static getOneByUsername = async (req: Request, res: Response) => {
    // Get the ID from the url
    const { username } = req.body;

    // Get the user from database
    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);
    try {
      const user = await userRepository.findOneOrFail({
        select: ['id', 'username', 'role'],
        where: [{ username }, { email: username }], // We dont want to send the password on response
      });

      const profile = await profileRepository.findOneOrFail({ where: { userId: user.id } });

      res.send({ user, profile });
    } catch (error) {
      res.status(404).send({ message: messages.error.userNotExisting, type: 'error' });
    }
  };

  public static newUser = async (req: Request, res: Response) => {
    // Get parameters from the body
    const { username, email, password } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.role = '';
    user.isVerified = true;
    user.status = 'Active';
    user.dateCreated = new Date();

    // Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Hash the password, to securely store on DB
    user.hashPassword();

    // Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);
    const userExists = await userRepository.findOne({ where: { username } });
    const emailExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      res.status(500).send({ message: messages.error.usernameExists, type: 'error' });
      return;
    } else if (emailExists) {
      res.status(500).send({ message: messages.error.emailExists, type: 'error' });
      return;
    }
    try {
      await userRepository.save(user).then(async createdUser => {
        const profile = new Profile();
        profile.userId = createdUser.id;
        profile.firstName = '';
        profile.lastName = '';
        profile.middleName = '';
        await profileRepository.save(profile);
      });
    } catch (e) {
      // writeFile for logs
      console.log(e);
      res.status(409).send(e);
      return;
    }

    // If all ok, send 201 response
    res.status(201).send({ message: messages.success.userCreated, type: 'success' });
  };

  public static deleteUser = async (req: Request, res: Response) => {
    // Get the ID from the url
    const { username } = req.body;
    const userRepository = getRepository(User);
    const profileRepository = getRepository(Profile);

    let user: User;
    let profile: Profile;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
      profile = await profileRepository.findOneOrFail({ where: { userId: user.id } });
    } catch (error) {
      res.status(404).send({ message: messages.error.userNotExisting, type: 'error' });
      return;
    }
    userRepository.delete(user.id);
    profileRepository.delete(profile.id);

    // After all send a 204 (no content, but accepted) response
    res.status(200).send({ message: messages.success.userDeleted });
  };
}

export default UserController;
