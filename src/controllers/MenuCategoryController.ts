import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Menucategory } from '../entity/Menucategory';

class MenuCategoryController {
  public static getAllMenuCategory = async (req: Request, res: Response) => {
    const categoryMenuRepository = getRepository(Menucategory);

    const allCategoryMenu = await categoryMenuRepository.find({ select: ['id', 'category'] });
    res.send(allCategoryMenu).status(200);
  };

  public static createMenuCategory = async (req: Request, res: Response) => {
    const { category } = req.body;
    const menuCategory = new Menucategory();
    menuCategory.category = category;
    const categoryMenuRepository = getRepository(Menucategory);
    try {
      const result = await categoryMenuRepository.save(menuCategory);
      res.send(result).status(201);
    } catch (error) {
      res.status(409).send(error);
    }
  };
}

export default MenuCategoryController;
