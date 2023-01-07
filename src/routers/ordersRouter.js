import { Router } from "express";
import { insertOrder } from "../controllers/ordersController.js";
import { validateOrder } from "../middlewares/validateOrder.js";


const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, insertOrder);

export default ordersRouter;