import * as Router from "koa-router";

import validate from "../middleware/request-validator";
import orderBookValidations from "./orderBook.validation";

import * as orderBookController from "./orderBook.controller";

const router = new Router();

router.get(
  "/orderbook",
  validate(orderBookValidations.getOrderBook),
  orderBookController.getOrderBook,
);

export default router;
