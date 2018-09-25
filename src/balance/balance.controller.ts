"use strict";
import { Context } from "koa";

import * as balanceService from "./balance.service";

const getBalance = async (ctx: Context) => {
  const { id, credentials } = ctx.query;
  ctx.body = await balanceService.getBalance(id, credentials);
};

export { getBalance };
