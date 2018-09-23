import * as Koa from "koa";
import logger from "koa-logger";
import router from "./router";

import { updateExchanges } from "./exchanges/loadMarkets";

updateExchanges();

const app = new Koa();

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
