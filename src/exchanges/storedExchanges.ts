"use strict";
import * as ccxt from "ccxt";

import appError from "../helpers/appError";
import logger from "../helpers/logger";
import exchangesWithCredentials from "./exchangesWithCredentials";

class Exchanges {
  protected storedExchanges: any;

  constructor() {
    this.storedExchanges = {};
  }

  public getExchange = async (
    id: string,
    creds = null,
  ): Promise<ccxt.Exchange> => {
    const foundExchange: ccxt.Exchange = this.storedExchanges[id];

    if (!foundExchange || (!foundExchange.apiKey && creds)) {
      logger.info(`${id}: fetching market`);
      const addedExchange: ccxt.Exchange = await this.addExchange(id, creds);
      return addedExchange;
    }

    return foundExchange;
  };

  public addExchange = async (
    id: string,
    creds = {},
  ): Promise<ccxt.Exchange> => {
    const isSupported: boolean = ccxt.exchanges.indexOf(id) > -1;

    if (isSupported) {
      try {
        const exchange: ccxt.Exchange = new ccxt[id]({
          enableRateLimit: true,
          ...creds,
        });

        this.storedExchanges[id] = exchange;
        await exchange.loadMarkets();

        return exchange;
      } catch (err) {
        throw new appError(404, `${id}: - ${err.message}`);
      }
    } else {
      throw new appError(404, `${id}: is not supported`);
    }
  };

  public updateExchanges = (TIME_PERIOD: number): void => {
    setInterval(() => {
      Object.keys(this.storedExchanges).forEach((id: string) => {
        try {
          this.storedExchanges[id].loadMarkets();
        } catch (err) {
          logger.error(`${id}: - ${err.message}`);
        }
      });
    }, TIME_PERIOD);
  };

  public initialExchangeLoad = async (): Promise<boolean> => {
    try {
      const response: boolean = await this.loadDefaultExchanges();
      return response;
    } catch (err) {
      logger.error(`${err.message}`);
      return false;
    }
  };

  private loadDefaultExchanges = async (): Promise<boolean> => {
    await Promise.all(
      ccxt.exchanges.map(async (id: string) => {
        const storedCredentials: object = exchangesWithCredentials[id] || {};
        const exchange: ccxt.Exchange = new ccxt[id](storedCredentials);

        try {
          await exchange.loadMarkets();
          this.storedExchanges[id] = exchange;
        } catch (err) {
          logger.error(`${id} - ${err.message}`);
        }
      }),
    );
    return true;
  };
}

const ExchangeInstance = new Exchanges();
export default ExchangeInstance;
