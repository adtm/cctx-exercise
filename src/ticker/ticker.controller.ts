import { Context } from "koa";

import * as tickerService from "./ticker.service";

interface IdSymbolParam {
  id: string;
  symbol: string;
}

const getTicker = async (ctx: Context) => {
  const { id, symbol }: IdSymbolParam = ctx.query;
  ctx.body = await tickerService.getTicker(id, symbol);
};

export { getTicker };
