import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";

const getSymbols = async (id: string): Promise<string[]> => {
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id);

  const symbols: string[] = exchange.symbols;
  return symbols;
};

export { getSymbols };
