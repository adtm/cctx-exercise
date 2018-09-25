import { Context } from "koa";
import logger from "../helpers/logger";

const errorHandler = async (ctx: Context, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err.message);

    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
};

export default errorHandler;
