import Exchanges from "../exchanges/storedExchanges";

const getOrderBook = async (id, symbol) => {
  const exchange: any = await Exchanges.getExchange(id);

  try {
    const orderBook = await exchange.fetchOrderBook(symbol);
    return orderBook;
  } catch (err) {
    console.log(err);
  }
};

export default getOrderBook;
