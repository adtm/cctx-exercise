"use strict";
import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";
import { decryptQueryParams, encryptQueryParams } from "../utils/encryption";

const getBalance = async (id: string, creds): Promise<ccxt.Balances> => {
  // const encryptedCreds = encryptQueryParams(creds);
  // const decryptCreds = decryptQueryParams(encryptedCreds); // WARN: for decryption testing

  console.log("getExchange");
  console.time();
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);
  console.timeEnd();

  try {
    console.log("fetchBalance");
    console.time();
    const exchangeBalance: ccxt.Balances = await exchange.fetchBalance();
    console.timeEnd();
    return exchangeBalance;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { getBalance };
