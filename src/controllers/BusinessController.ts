import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Business } from "../entity/Business";
import { validate } from "class-validator";


class BusinessController {

    static getBusiness = async (req: Request, res: Response) => {
       const businessRepository = getRepository(Business);
       const allBusiness = businessRepository.find({
           select: ["id", "name", "userId", "category", "logoImageUrl", "dateCreated", "dateModified"]
       });
       res.send(allBusiness);
    }

    static createBusiness = async (req: Request, res: Response) => {
        const businessRepository = getRepository(Business);
        let { name, category} = req.body;
        let business = new Business();
        business.name = name;
        business.userId = res.locals.jwtPayload.userId;
        business.category = category;
        business.dateCreated = new Date();

        const errors = await validate(business);

        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await businessRepository.save(business);
            res.status(200).send(business);
        } catch(e) {
            console.log(e);
            res.status(409).send(e);
            return;
        }
    }

    static deleteBusiness = async (req: Request, res: Response) => {
        const businessRepository = getRepository(Business);
        let { id } = req.body;
        const business = await businessRepository.findOneOrFail(id);
        try {
            await businessRepository.delete(business);
        } catch(e) {
            res.status(409).send(e);
        }
    }
} 

export default BusinessController;