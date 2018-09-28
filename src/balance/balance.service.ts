"use strict";
import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";
import { decryptQueryParams, encryptQueryParams } from "../utils/encryption";

const getBalance = async (id: string, creds): Promise<ccxt.Balances> => {
  try {
    const decryptCreds = decryptQueryParams(creds);
    const exchange: ccxt.Exchange = await Exchanges.getExchange(
      id,
      decryptCreds,
    );

    const exchangeBalance: ccxt.Balances = await exchange.fetchBalance();
    return exchangeBalance;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getBalance };
