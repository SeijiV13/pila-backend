import { Request } from 'express';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Businesscategory } from './../entity/Businesscategory';
import messages from '../config/messages';
import { resolveTxt } from 'dns';

class BusinessCategoryController {
  public static getAllCategories = async (req: Request, res: Response) => {
    const businesCategoryRepository = getRepository(Businesscategory);
    const businessCategory = await businesCategoryRepository.find({
      select: ['id', 'category'],
    });
    res.status(200).send(businessCategory);
  };

  public static createCategory = async (req: Request, res: Response) => {
    const businessCategoryRepository = getRepository(Businesscategory);
    const { id, category } = req.body;
    const newBusiness = new Businesscategory();
    newBusiness.id = id;
    newBusiness.category = category;

    businessCategoryRepository
      .save(newBusiness)
      .then(newBusinessCategory => {
        res.status(201).send({
          message: messages.success.businessCategoryCreated,
          type: 'success',
          // tslint:disable-next-line: object-literal-sort-keys
          object: newBusinessCategory,
        });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  };

  public static updateCategory = async (req: Request, res: Response) => {
    const businessCategoryRepository = getRepository(Businesscategory);
    const { id, category } = req.body;
    // find selected business category in repo
    const businessCategory: Businesscategory = await businessCategoryRepository.findOne({
      select: ['id', 'category'],
      where: { id },
    });

    businessCategory.id = id;
    businessCategory.category = category;

    businessCategoryRepository
      .save(businessCategory)
      .then(data => {
        res.status(200).send({
          message: messages.success.businessCategoryUpdated,
          type: 'success',
          // tslint:disable-next-line: object-literal-sort-keys
          object: data,
        });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  };
}

export default BusinessCategoryController;
