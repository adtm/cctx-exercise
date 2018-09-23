import { getExchange } from "../exchanges/loadMarkets";

// TODO: there are other params to instiate an exchange - handle this
const getBalance = async (id, { apiKey, secret }) => {
  const exchange: any = await getExchange(id);

  try {
    const instiatedExchange = exchange[id]({
      apiKey,
      secret
    });
    const exchangeBalance = await instiatedExchange.fetchBalance();
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
