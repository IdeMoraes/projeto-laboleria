import { Router } from "express";
import { insertClient } from "../controllers/clientsController.js";
import { validateClient } from "../middlewares/validateClient.js";

const clientsRouter = Router();
clientsRouter.post('/clients', validateClient, insertClient);

export default clientsRouter;