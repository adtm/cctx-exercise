"use strict";
import { Context } from "koa";

import * as balanceService from "./balance.service";

interface IdCredentialParams {
  id: string;
  credentials: object;
}

const getBalance = async (ctx: Context) => {
  const { id, credentials }: IdCredentialParams = ctx.query;
  ctx.body = await balanceService.getBalance(id, credentials);
};

export { getBalance };
