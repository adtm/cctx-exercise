import * as Router from "koa-router";

import validate from "../middleware/request-validator";
import placeOrderValidations from "./placeOrder.validation";

import * as placeOrderController from "./placeOrder.controller";

const router = new Router();

router.get(
  "/placeOrder",
  validate(placeOrderValidations.placeOrder),
  placeOrderController.placeOrder,
);

export default router;
