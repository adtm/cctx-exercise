import Exchanges from "../exchanges/storedExchanges";

// TODO: check about speed issues
const getTicker = async (id, symbol) => {
  const exchange: any = await Exchanges.getExchange(id);

  try {
    const ticker = await exchange.fetchTicker(symbol);
    return ticker;
  } catch (err) {
    console.log(err);
  }
};

export default getTicker;
