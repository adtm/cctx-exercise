import * as Router from "koa-router";
import getBalance from "./balance.service";

const router = new Router();

router.get("/balance", async ctx => {
  const { id, apiKey, secret, ...params } = ctx.query;
  ctx.body = await getBalance(id, {
    apiKey,
    secret,
    ...params
  });
});

export default router;
