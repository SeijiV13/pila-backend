import { IsLowercase, validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import config from '../config/config';
import messages from '../config/messages';
import { Business } from '../entity/Business';
import { StorageHelper } from '../helpers/storage-helper';
class BusinessController {
  public static storageHelper: StorageHelper = new StorageHelper();
  public static getBusiness = async (req: Request, res: Response) => {
    const businessRepository = getRepository(Business);
    const allBusiness = await businessRepository.find({
      select: [
        'id',
        'name',
        'description',
        'categoryId',
        'logoImageUrl',
        'dateCreated',
        'dateModified',
      ],
    });
    res.send(allBusiness).status(200);
  };

  public static createBusiness = async (req: Request, res: Response) => {
    const businessRepository = getRepository(Business);
    const { name, description, categoryId } = req.body;
    const business = new Business();
    business.name = name;
    // business.userId = res.locals.jwtPayload.userId;
    business.categoryId = categoryId;
    business.dateCreated = new Date();
    business.description = description;
    const errors = await validate(business);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await businessRepository.save(business);
      res.status(200).send(business);
    } catch (e) {
      console.log(e);
      res.status(409).send(e);
      return;
    }
  };

  public static deleteBusiness = async (req: Request, res: Response) => {
    const businessRepository = getRepository(Business);
    const { id } = req.body;
    const business = await businessRepository.findOneOrFail(id);
    try {
      await businessRepository.delete(business);
    } catch (e) {
      res.status(409).send(e);
    }
  };

  public static uploadLogoImage = async (req, res: Response) => {
    // Get the ID from the url
    const file = req.file;
    const { businessId } = req.body;
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

    const result: any = await BusinessController.storageHelper.uploadFileToBlob(
      `${res.locals.jwtPayload.userId}/images/${businessId}`,
      file,
      `businessLogo.png`
    );
    const businessRepository = getRepository(Business);
    let business: Business;

    try {
      business = await businessRepository.findOneOrFail({ where: { id: businessId } });
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send({ message: messages.error.businessNotExisting, type: 'error' });
      return;
    }

    business.logoImageUrl = result.url;
    businessRepository.save(business);
    res.send({ message: messages.success.businessImageUploaded, type: 'success' }).status(201);
  };
}

export default BusinessController;
