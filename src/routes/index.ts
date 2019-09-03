import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import business from "./business"

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/business",  business);

export default routes;