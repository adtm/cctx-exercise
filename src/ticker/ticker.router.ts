import * as Router from "koa-router";
import getTickers from "./ticker.service";

const router = new Router();

router.get("/ticker", async ctx => {
  const { id } = ctx.query;
  ctx.body = await getTickers(id);
});

export default router;
