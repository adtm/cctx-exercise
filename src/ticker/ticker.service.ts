import * as ccxt from "ccxt";
import Exchanges from "../exchanges/storedExchanges";

const getTicker = async (id, symbol) => {
  try {
    const exchange: ccxt.Exchange = await Exchanges.getExchange(id);
    const ticker: ccxt.Ticker = await exchange.fetchTicker(symbol);
    return ticker;
  } catch (err) {
    // console.log(err);
  }
};

export { getTicker };
