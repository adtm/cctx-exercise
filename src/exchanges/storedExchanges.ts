"use strict";
import * as fs from "fs";
import * as path from "path";

import * as ccxt from "ccxt";

import exchangesWithCredentials from "./exchangesWithCredentials";

import { getFormattedDate } from "../utils/date";

const stream = fs.createWriteStream(
  `${path.join(__dirname, "..", "..")}/src/logs/${getFormattedDate()}.txt`,
);

const SECOND = 1000;

class Exchanges {
  protected storedExchanges: any;

  constructor() {
    this.storedExchanges = {};
  }

  public getExchange = async (id: string, creds = {}) => {
    const foundExchange = this.storedExchanges[id];

    if (!foundExchange) {
      const addedExchange = await this.addExchange(id, creds);
      return addedExchange;
    }
    return foundExchange;
  };

  public addExchange = async (id: string, creds = {}) => {
    const isSupported = ccxt.exchanges.indexOf(id) > -1;

    if (isSupported) {
      const exchange = new ccxt[id]({ enableRateLimit: true, ...creds });
      this.storedExchanges[id] = exchange;
      await exchange.loadMarkets();
      return exchange;
    } else {
      // console.log("Exchange is not supported");
      return null;
    }
  };

  public updateExchanges = () => {
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

  public initialExchangeLoad = async () => {
    try {
      await this.loadDefaultExchanges();
      return true;
    } catch (err) {
      return false;
    }
  };

  private loadDefaultExchanges = async () => {
    await Promise.all(
      ccxt.exchanges.map(async (id: string) => {
        const storedCredentials: object = exchangesWithCredentials[id] || {};
        const exchange: ccxt.Exchange = new ccxt[id](storedCredentials);

        try {
          await exchange.loadMarkets();
          this.storedExchanges[id] = exchange;
        } catch (err) {
          stream.write(`${getFormattedDate()} - ${id} - ${err} \n`);
        }
      }),
    );
  };
}

const ExchangeInstance = new Exchanges();
export default ExchangeInstance;
