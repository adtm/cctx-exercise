import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";

const getOrderBook = async (id: string, symbol: string) => {
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id);

  try {
    const orderBook: ccxt.OrderBook = await exchange.fetchOrderBook(symbol);
    return orderBook;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getOrderBook };
