import * as Koa from "koa";
import * as logger from "koa-logger";
import router from "./router";

import Exchanges from "./exchanges/storedExchanges";
Exchanges.addDefaultExchanges();
Exchanges.updateExchanges();

const app = new Koa();

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
