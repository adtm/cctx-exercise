import { Context } from "koa";

import * as orderBookService from "./orderBook.service";

interface IdSymbolParam {
  id: string;
  symbol: string;
}

const getOrderBook = async (ctx: Context) => {
  const { id, symbol }: IdSymbolParam = ctx.query;
  ctx.body = await orderBookService.getOrderBook(id, symbol);
};

export { getOrderBook };
