import * as Koa from "koa";
import * as Router from "koa-router";

import tickerRouter from "./ticker/ticker.router";
import symbolRouter from "./symbol/symbol.router";

import { updateExchanges } from "./exchanges/loadMarkets";
updateExchanges();

const app = new Koa();
const router = new Router();

router.use(tickerRouter.routes());
router.use(symbolRouter.routes());

app.use(router.routes()).use(router.allowedMethods());

export default app;
