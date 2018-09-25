"use strict";
import * as Router from "koa-router";

import validate from "../middleware/request-validator";
import balanceValidations from "./balance.validation";

import * as balanceController from "./balance.controller";

const router = new Router();

router.get(
  "/balance",
  validate(balanceValidations.getBalance),
  balanceController.getBalance,
);

export default router;
