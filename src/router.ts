import * as Router from "koa-router";

import balanceRouter from "./balance/balance.router";
import orderBookRouter from "./orderBook/orderBook.router";
import placeOrderRouter from "./placeOrder/placeOrder.router";
import symbolRouter from "./symbol/symbol.router";
import tickerRouter from "./ticker/ticker.router";

const router = new Router();

router.use(balanceRouter.routes());
router.use(orderBookRouter.routes());
router.use(placeOrderRouter.routes());
router.use(symbolRouter.routes());
router.use(tickerRouter.routes());

export default router;
