import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";

const getSymbols = async (id: string) => {
  try {
    const exchange: ccxt.Exchange = await Exchanges.getExchange(id);
    const symbols: string[] = exchange.symbols;
    return symbols;
  } catch (err) {
    // console.log(err);
  }
};

export { getSymbols };
