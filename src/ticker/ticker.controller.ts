import { Context } from "koa";

import * as tickerService from "./ticker.service";

const getTicker = async (ctx: Context) => {
  const { id, symbol } = ctx.query;
  ctx.body = await tickerService.getTicker(id, symbol);
};

export { getTicker };
