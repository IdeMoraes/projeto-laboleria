import { Router } from "express";
import { insertFlavour } from "../controllers/flavoursController.js";
import { validateFlavour } from "../middlewares/validateFlavour.js";

const flavoursRouter = Router();
flavoursRouter.post('/flavours', validateFlavour, insertFlavour);

export default flavoursRouter;