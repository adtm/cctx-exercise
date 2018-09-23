import Exchanges from "../exchanges/storedExchanges";

const getBalance = async (id, creds) => {
  const exchange: any = await Exchanges.getExchange(id, creds);

  try {
    const exchangeBalance = await exchange.fetchBalance();
    return exchangeBalance;
  } catch (err) {
    console.log(err);
  }
};

export default getBalance;

/**
 * CCXT API KEY EXAMPLES (hitbtc),
  'apiKey': '18339694544745d9357f9e7c0f7c41bb',
  'secret': '8340a60fb4e9fc73a169c26c7a7926f5',
*/
