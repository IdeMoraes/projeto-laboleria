import { Router } from "express";
import { insertCake } from "../controllers/cakesController.js";
import { validateCake } from "../middlewares/validateCake.js";

const cakesRouter = Router();
cakesRouter.post('/cakes', validateCake, insertCake);

export default cakesRouter;