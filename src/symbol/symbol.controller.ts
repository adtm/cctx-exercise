import { Context } from "koa";

import * as symbolService from "./symbol.service";

const getTicker = async (ctx: Context) => {
  const { id } = ctx.query;
  ctx.body = await symbolService.getSymbols(id);
};

export { getTicker };
