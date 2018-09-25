"use strict";
import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";

const getBalance = async (id: string, creds): Promise<ccxt.Balances> => {
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);

  try {
    const exchangeBalance: ccxt.Balances = await exchange.fetchBalance();
    return exchangeBalance;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getBalance };
