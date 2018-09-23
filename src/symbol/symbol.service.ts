const ccxt = require("ccxt");

import Exchanges from "../exchanges/storedExchanges";

const getSymbols = async id => {
  try {
    const exchange: any = await Exchanges.getExchange(id);

    const symbols = exchange.symbols;
    return symbols;
  } catch (err) {
    console.log(err);
  }
};

export default getSymbols;
