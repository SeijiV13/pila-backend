import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import config from '../config/config';
import { Profile } from '../entity/Profile';

class ProfileController {
  public static listAll = async (req: Request, res: Response) => {
    // Get profiles from database
    const profileRepository = getRepository(Profile);
    const profiles = await profileRepository.find({
      select: ['firstName', 'middleName', 'lastName', 'dateOfBirth'], // We dont want to send the passwords on response
    });

    // Send the profiles object
    res.send(profiles);
  };

  public static getOneById = async (req: Request, res: Response) => {
    // Get the ID from the url
    const userId = req.params.userId;

    // Get the profile from database
    const profileRepository = getRepository(Profile);
    try {
      const profile = await profileRepository.findOneOrFail(userId, {
        select: ['firstName', 'middleName', 'lastName', 'dateOfBirth'], // We dont want to send the password on response
      });
      res.send(profile);
    } catch (error) {
      res.status(404).send('profile not found');
    }
  };

  public static newProfile = async (req: Request, res: Response) => {
    // Get parameters from the body
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      country,
      state,
      city,
      zipCode,
    } = req.body;
    const profile = new Profile();
    profile.firstName = firstName;
    profile.middleName = middleName;
    profile.lastName = lastName;
    profile.dateOfBirth = dateOfBirth;
    profile.gender = gender;
    profile.mobileNumber = mobileNumber;
    profile.country = country;
    profile.state = state;
    profile.city = city;
    profile.zipCode = zipCode;
    profile.dateCreated = new Date();

    // Validade if the parameters are ok
    const errors = await validate(profile);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save. If fails, the profilename is already in use
    const profileRepository = getRepository(Profile);
    try {
      await profileRepository.save(profile);
    } catch (e) {
      // writeFile for logs
      console.log(e);
      res.status(409).send(e);
      return;
    }

    // If all ok, send 201 response
    res.status(201).send('profile created');
  };

  public static editProfile = async (req: Request, res: Response) => {
    // Get the ID from the url
    let jwtPayload;
    const token = req.headers.auth as string;
    // Try to validate the token and get data
    try {
      jwtPayload = jwt.verify(token, config.jwtSecret) as any;
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      // If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    // Get values from the body
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      country,
      state,
      city,
      zipCode,
    } = req.body;

    // Try to find profile on database
    const profileRepository = getRepository(Profile);
    let profile;
    try {
      profile = await profileRepository.findOneOrFail({ where: { userId: jwtPayload.userId } });
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send('profile not found');
      return;
    }
    profile.firstName = firstName;
    profile.middleName = middleName;
    profile.lastName = lastName;
    profile.dateOfBirth = dateOfBirth;
    profile.gender = gender;
    profile.mobileNumber = mobileNumber;
    profile.country = country;
    profile.state = state;
    profile.city = city;
    profile.zipCode = zipCode;
    profile.dateCreated = new Date();

    // Validate the new values on model
    const errors = await validate(profile);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Try to safe, if fails, that means profilename already in use
    try {
      await profileRepository.save(profile);
    } catch (e) {
      res.status(409).send();
      return;
    }
    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  public static deleteProfile = async (req: Request, res: Response) => {
    // Get the ID from the url
    const id = req.params.id;

    const profileRepository = getRepository(Profile);
    let profile: Profile;
    try {
      profile = await profileRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('profile not found');
      return;
    }
    profileRepository.delete(id);

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default ProfileController;
