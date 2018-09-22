import * as Router from "koa-router";
import getSymbols from "./symbol.service";

const router = new Router();

router.get("/symbol", async ctx => {
  const { symbol } = ctx.query;
  ctx.body = await getSymbols(symbol);
});

export default router;
