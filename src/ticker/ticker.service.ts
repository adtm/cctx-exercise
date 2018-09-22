import { getExchange } from "../exchanges/loadMarkets";

const getTickers = async id => {
  const exchange: any = await getExchange(id);

  try {
    const tickers = await exchange.fetchTickers();
    return tickers;
  } catch (err) {
    console.log(err);
  }
};

export default getTickers;
