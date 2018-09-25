"use strict";
import * as ccxt from "ccxt";

import appError from "../helpers/appError";
import logger from "../helpers/logger";
import exchangesWithCredentials from "./exchangesWithCredentials";

const SECOND = 1000;

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

    console.log(id);
    // console.log(foundExchange.loadedWithCredential);
    console.log(creds);

    if (!foundExchange || !foundExchange.loadedWithCredentials || creds) {
      logger.info(`${id}: fetching market`);
      const addedExchange: ccxt.Exchange = await this.addExchange(id, creds);
      return addedExchange;
    }

    console.log("has stored creds");
    return foundExchange;
  };

  public addExchange = async (
    id: string,
    creds = null,
  ): Promise<ccxt.Exchange> => {
    console.log("---");

    console.log(id);

    const isSupported: boolean = ccxt.exchanges.indexOf(id) > -1;

    if (isSupported) {
      try {
        const exchange: ccxt.Exchange = new ccxt[id]({
          enableRateLimit: true,
          ...creds,
        });

        // this.storedExchanges[id] = exchange;
        await exchange.loadMarkets();
        console.log("here");
        // if (creds) {
        //   this.storedExchanges[id].loadedWithCredentials = true;
        // }

        return exchange;
      } catch (err) {
        console.log(err);
        throw new appError(404, `${id}: - ${err.message}`);
      }
    } else {
      throw new appError(404, `${id}: is not supported`);
    }
  };

  public updateExchanges = (): void => {
    setInterval(() => {
      Object.keys(this.storedExchanges).forEach((id: string) => {
        try {
          this.storedExchanges[id].loadMarkets();
        } catch (err) {
          logger.error(`${id}: - ${err.message}`);
        }
      });
    }, SECOND);
  };

  public initialExchangeLoad = async (): Promise<boolean> => {
    try {
      await this.loadDefaultExchanges();
      return true;
    } catch (err) {
      return false;
    }
  };

  private loadDefaultExchanges = async (): Promise<void> => {
    await Promise.all(
      ccxt.exchanges.map(async (id: string) => {
        const storedCredentials: object = exchangesWithCredentials[id] || {};
        const exchange: ccxt.Exchange = new ccxt[id](storedCredentials);

        try {
          await exchange.loadMarkets();
          this.storedExchanges[id] = exchange;

          if (exchangesWithCredentials[id]) {
            this.storedExchanges[id].loadedWithCredentials = true;
          }
        } catch (err) {
          logger.error(`${id} - ${err.message}`);
        }
      }),
    );
  };
}

const ExchangeInstance = new Exchanges();
export default ExchangeInstance;
