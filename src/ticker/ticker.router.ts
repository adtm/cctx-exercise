import * as Router from "koa-router";
import getTicker from "./ticker.service";

const router = new Router();

router.get("/ticker", async ctx => {
  const { id, symbol } = ctx.query;
  ctx.body = await getTicker(id, symbol);
});

export default router;
