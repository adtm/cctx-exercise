import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";

const getTicker = async (id: string, symbol: string) => {
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id);

  try {
    const ticker: ccxt.Ticker = await exchange.fetchTicker(symbol);
    return ticker;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getTicker };
