import { getExchange } from "../exchanges/loadMarkets";

const getTicker = async (id, symbol) => {
  const exchange: any = await getExchange(id);

  try {
    const ticker = await exchange.fetchTicker(symbol);
    return ticker;
  } catch (err) {
    console.log(err);
  }
};

export default getTicker;
