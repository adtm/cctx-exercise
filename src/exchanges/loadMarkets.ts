"use strict";
const ccxt = require("ccxt");

const { EventEmitter } = require("events");
const emitter = new EventEmitter();

const storedExchanges = {};

const getExchange = async (id: string) => {
  const foundExchange = storedExchanges[id];
  if (!foundExchange) {
    const addedExchange = await addExchange(id);
    return addedExchange;
  }
  return foundExchange;
};

const addExchange = async (id: string) => {
  const isSupported = ccxt.exchanges.indexOf(id) > -1;

  if (isSupported) {
    const exchange = new ccxt[id]({ enableRateLimit: true });
    storedExchanges[id] = exchange;
    return exchange;
  } else {
    console.log("Exchange is not supported");
    return null;
  }
};

const updateExchanges = () => {
  setInterval(() => {
    Object.keys(storedExchanges).forEach(async id => {
      try {
        await storedExchanges[id].loadMarkets();
      } catch (err) {
        console.error(`${err}, while loading market`);
      }
    });
  }, 5000);
};

export { getExchange, addExchange, updateExchanges };
