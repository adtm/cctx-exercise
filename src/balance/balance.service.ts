"use strict";
import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";
import { decryptQueryParams, encryptQueryParams } from "../utils/encryption";

const getBalance = async (id: string, creds): Promise<ccxt.Balances> => {
  // const encryptedCreds = encryptQueryParams(creds);
  // const decryptCreds = decryptQueryParams(encryptedCreds); // WARN: for decryption testing

  const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);

  try {
    const exchangeBalance: ccxt.Balances = await exchange.fetchBalance();
    return exchangeBalance;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getBalance };
