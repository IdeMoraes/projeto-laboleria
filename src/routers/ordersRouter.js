import { Router } from "express";
import { insertOrder, selectOrders } from "../controllers/ordersController.js";
import { validateOrder } from "../middlewares/validateOrder.js";


const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, insertOrder);
ordersRouter.get('/orders', selectOrders);
ordersRouter.get('/orders/:id', selectOrders);
ordersRouter.get('/clients/:id/orders', selectOrders);

export default ordersRouter;