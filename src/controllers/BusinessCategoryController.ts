import { Request } from 'express';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Businesscategory } from '../entity/Businesscategory';

class BusinessCategoryController {
  public static getAllCategories = async (req: Request, res: Response) => {
    const businesCategoryRepository = getRepository(Businesscategory);
    const businessCategory = await businesCategoryRepository.find({
      select: ['id', 'category'],
    });

    res.status(200).send(businessCategory);
  };
}

export default BusinessCategoryController;
