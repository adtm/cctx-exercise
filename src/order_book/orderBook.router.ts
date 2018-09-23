import * as Router from "koa-router";
import getOrderBook from "./orderBook.service";

const router = new Router();

router.get("/orderbook", async ctx => {
  const { id, symbol } = ctx.query;
  ctx.body = await getOrderBook(id, symbol);
});

export default router;
