import * as ccxt from "ccxt";
import Exchanges from "../exchanges/storedExchanges";

const getBalance = async (id: string, creds) => {
  try {
    const exchange: ccxt.Exchange = await Exchanges.getExchange(id, creds);
    const exchangeBalance: ccxt.Balances = await exchange.fetchBalance();
    return exchangeBalance;
  } catch (err) {
    // console.log(err);
  }
};

export { getBalance };
