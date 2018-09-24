import * as ccxt from "ccxt";
import Exchanges from "../exchanges/storedExchanges";

const getOrderBook = async (id: string, symbol: string) => {
  try {
    const exchange: ccxt.Exchange = await Exchanges.getExchange(id);
    const orderBook: ccxt.OrderBook = await exchange.fetchOrderBook(symbol);
    return orderBook;
  } catch (err) {
    // console.log(err);
  }
};

export { getOrderBook };
