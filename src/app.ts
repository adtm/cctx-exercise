import * as Koa from "koa";
import * as koaLogger from "koa-logger";

import errorHandler from "./middleware/error-handler";
import router from "./router";

import Exchanges from "./exchanges/storedExchanges";
import logger from "./helpers/logger";

const SECOND = 1000;
const app = new Koa();

(async () => {
  const loadStatus = await Exchanges.initialExchangeLoad();

  if (loadStatus) {
    logger.info("Markets loaded succesfully!");
    Exchanges.updateExchanges(SECOND);

    app.use(koaLogger());
    app.use(errorHandler);
    app.use(router.routes());
    app.use(router.allowedMethods());

    logger.info("Erorr handling & routes configured!");
  } else {
    logger.error("Couldn't load initial exchanges");
  }
})();

export default app;
