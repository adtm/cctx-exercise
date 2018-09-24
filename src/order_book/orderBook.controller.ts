import { Context } from "koa";

import * as orderBookService from "./orderBook.service";

const getOrderBook = async (ctx: Context) => {
  const { id, symbol } = ctx.query;
  ctx.body = await orderBookService.getOrderBook(id, symbol);
};

export { getOrderBook };
