import * as cluster from "cluster";
import * as fs from "fs";

import { createLogger, format, transports } from "winston";
const LEVEL: any = Symbol.for("level");

const customFormat = format.printf(
  info =>
    `[${info.level}]: [${process.pid}] - ${info.timestamp}: ${info.message}`,
);

const filterOnly = (level: string) =>
  format(info => {
    if (info[LEVEL] === level) {
      return info;
    }
  })();

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat,
  ),
  transports: [
    cluster.isMaster
      ? new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        })
      : null,
    new transports.File({
      level: "error",
      format: filterOnly("error"),
      filename: "logs/error.log",
    }),
    new transports.File({
      level: "info",
      format: filterOnly("info"),
      filename: "logs/info.log",
    }),
  ].filter(Boolean),
});

export default logger;
