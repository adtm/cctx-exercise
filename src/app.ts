import * as Koa from "koa";
import * as logger from "koa-logger";

import errorHandler from "./middleware/error-handler";
import router from "./router";

import Exchanges from "./exchanges/storedExchanges";

const app = new Koa();

(async () => {
  const status = await Exchanges.initialExchangeLoad();
  // Exchanges.updateExchanges();

  if (status) {
    console.log("cool");

    app.use(logger());
    app.use(errorHandler);
    app.use(router.routes());
    app.use(router.allowedMethods());
  } else {
    // throw new Error("Couldn\t load exchanges");
  }
})();
export default app;
