import * as Koa from "koa";
import * as logger from "koa-logger";
import router from "./router";

import Exchanges from "./exchanges/storedExchanges";

const app = new Koa();

(async () => {
  const status = await Exchanges.initialExchangeLoad();
  Exchanges.updateExchanges();

  if (status) {
    console.log("Karolis stahp");
    app.use(logger());
    app.use(router.routes());
    app.use(router.allowedMethods());
  } else {
    console.log("yolo");
    return 0;
  }
})();
export default app;
