import * as ccxt from "ccxt";

import Exchanges from "../exchanges/storedExchanges";
import appError from "../helpers/appError";

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
  const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);

  try {
    const placedOrder = await exchange.createOrder(
      symbol,
      orderType,
      side,
      amount,
      price,
      { id },
    );
    console.log("yoyo");
    return placedOrder;
  } catch (err) {
    console.log(err);
    throw new appError(404, `${id}: - ${err.message}`);
  }
};

export { placeOrder };
