import * as Router from "koa-router";

import validate from "../middleware/request-validator";
import tickerValidations from "./ticker.validation";

import * as tickerController from "./ticker.controller";

const router = new Router();

router.get(
  "/ticker",
  validate(tickerValidations.getTicker),
  tickerController.getTicker,
);

export default router;
