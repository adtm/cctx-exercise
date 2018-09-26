import { Context } from "koa";

import * as placeOrderService from "./placeOrder.service";

const placeOrder = async (ctx: Context) => {
  ctx.body = await placeOrderService.placeOrder(ctx.query);
};

export { placeOrder };
