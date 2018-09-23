"use strict";
const ccxt = require("ccxt");

const SECOND = 1000;

class Exchanges {
  storedExchanges: Object;

  constructor() {
    this.storedExchanges = {};
  }

  getExchange = async (id: string) => {
    const foundExchange = this.storedExchanges[id];

    console.log(this.storedExchanges);
    console.log(foundExchange);

    if (!foundExchange) {
      const addedExchange = await this.addExchange(id);
      return addedExchange;
    }
    return foundExchange;
  };

  addExchange = async (id: string) => {
    const isSupported = ccxt.exchanges.indexOf(id) > -1;

    if (isSupported) {
      const exchange = new ccxt[id]({ enableRateLimit: true });
      this.storedExchanges[id] = exchange;
      await exchange.loadMarkets();
      return exchange;
    } else {
      console.log("Exchange is not supported");
      return null;
    }
  };

  updateExchanges = () => {
    setInterval(() => {
      Object.keys(this.storedExchanges).forEach(id => {
        try {
          this.storedExchanges[id].loadMarkets();
          console.log(id, new Date());
        } catch (err) {
          console.error(`${err}, while loading market`);
        }
      });
    }, SECOND);
  };

  addDefaultExchanges = () => {
    const defaultExchanges = ["kraken", "bittrex"];
    for (let i = 0; i < defaultExchanges.length; ++i)
      this.addExchange(defaultExchanges[i]);
  };
}

const ExchangeInstance = new Exchanges();

export default ExchangeInstance;
