import { Router } from "express";
import { insertOrder, selectOrders, updateOrder } from "../controllers/ordersController.js";
import { validateOrder } from "../middlewares/validateOrder.js";


const ordersRouter = Router();
ordersRouter.post('/order', validateOrder, insertOrder);
ordersRouter.get('/orders', selectOrders);
ordersRouter.get('/orders/:id', selectOrders);
ordersRouter.get('/clients/:id/orders', selectOrders);
ordersRouter.patch('/order/:id', updateOrder);

export default ordersRouter;