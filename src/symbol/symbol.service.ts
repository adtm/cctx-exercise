import { getExchange } from "../exchanges/loadMarkets";

const getSymbols = async id => {
  const exchange: any = await getExchange(id);

  try {
    const tickers = exchange.symbols.length.toString();
    return tickers;
  } catch (err) {
    console.log(err);
  }
};

export default getSymbols;
