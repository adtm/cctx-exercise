import * as Router from "koa-router";

import tickerRouter from "./ticker/ticker.router";
import symbolRouter from "./symbol/symbol.router";
import orderBookRouter from "./order_book/orderBook.router";
import balanceRouter from "./balance/balance.router";
import placeOrderRouter from "./place_order/placeOrder.router";

const router = new Router();

router.use(tickerRouter.routes());
router.use(symbolRouter.routes());
router.use(orderBookRouter.routes());
router.use(balanceRouter.routes());
router.use(placeOrderRouter.routes());

export default router;
