import { Context } from "koa";

import * as symbolService from "./symbol.service";

interface IdParam {
  id: string;
}

const getTicker = async (ctx: Context) => {
  const { id }: IdParam = ctx.query;
  ctx.body = await symbolService.getSymbols(id);
};

export { getTicker };
