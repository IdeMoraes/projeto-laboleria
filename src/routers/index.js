import { Router } from "express";
import cakesRouter from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";
import flavoursRouter from "./flavoursRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(flavoursRouter);
router.use(cakesRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;