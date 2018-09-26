import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";
import { decryptQueryParams, encryptQueryParams } from "../utils/encryption";

interface IOrderParams {
  id: string;
  symbol: string;
  orderType: string;
  side: "sell" | "buy";
  amount: number;
  price: number;
}

const placeOrder = async ({
  id,
  symbol,
  orderType,
  side,
  amount,
  price,
  ...creds
}: IOrderParams): Promise<any> => {
  // const encryptedCreds = encryptQueryParams(creds);
  // const decryptCreds = decryptQueryParams(encryptedCreds); // WARN: for decryption testing

  const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);

  try {
    const placedOrder = await exchange.createOrder(
      symbol,
      orderType,
      side,
      amount,
      price,
    );
    return placedOrder;
  } catch (err) {
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { placeOrder };
