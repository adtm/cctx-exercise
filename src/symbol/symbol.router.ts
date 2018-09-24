import * as Router from "koa-router";

import validate from "../middleware/request-validator";
import symbolValidation from "./symbol.validation";

import * as symbolController from "./symbol.controller";

const router = new Router();

router.get(
  "/symbol",
  validate(symbolValidation.getSymbol),
  symbolController.getTicker,
);

export default router;
