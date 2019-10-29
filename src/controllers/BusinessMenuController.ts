import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Businessmenu } from '../entity/Businessmenu';

class BusinessMenuController {
  public static getAllBusinessMenu = async (req: Request, res: Response) => {
    const businessMenuRepository = getRepository(Businessmenu);
    const allbusinesMenu = await businessMenuRepository.find({
      select: [
        'id',
        'businessId',
        'categoryId',
        'name',
        'description',
        'price',
        'isDeleted',
        'dateCreated',
        'dateModified',
      ],
    });

    res.send(allbusinesMenu).status(200);
  };

  public static getAllBusinessMenuOfOneBusiness = async (req: Request, res: Response) => {
    const { businessId } = req.body;
    const businessMenuRepository = getRepository(Businessmenu);

    const businessMenu = await businessMenuRepository.find({
      select: [
        'id',
        'businessId',
        'categoryId',
        'name',
        'description',
        'price',
        'isDeleted',
        'dateCreated',
        'dateModified',
      ],
      where: { businessId },
    });

    res.send(businessMenu).status(200);
  };

  public static createBusinessMenu = async (req: Request, res: Response) => {
    const { businessId, categoryId, name, description, price } = req.body;
    const businessMenuRepository = getRepository(Businessmenu);
    const businessMenu = new Businessmenu();
    businessMenu.businessId = businessId;
    businessMenu.name = name;
    businessMenu.categoryId = categoryId;
    businessMenu.description = description;
    businessMenu.price = price;
    businessMenu.isDeleted = 0;
    businessMenu.dateCreated = new Date();
    businessMenu.dateModified = new Date();
    // Validade if the parameters are ok
    const errors = await validate(businessMenu);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      const createdBusiness = await businessMenuRepository.save(businessMenu);
      res.status(200).send(createdBusiness);
    } catch (e) {
      // writeFile for logs
      console.log(e);
      res.status(409).send(e);
      return;
    }
  };
}

export default BusinessMenuController;
