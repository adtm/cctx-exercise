import * as path from "path";
import { createLogger, format, transports } from "winston";
const LEVEL: any = Symbol.for("level");

const customFormat = format.printf(info => {
  return `[${info.level}] - ${info.timestamp}: ${info.message}`;
});

const filterOnly = level => {
  return format(info => {
    if (info[LEVEL] === level) {
      return info;
    }
  })();
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      level: "error",
      format: filterOnly("error"),
      filename: path.join(__dirname, "..", `/logs/error.log`),
    }),
    new transports.File({
      level: "info",
      format: filterOnly("info"),
      filename: path.join(__dirname, "..", `/logs/info.log`),
    }),
  ],
  exitOnError: false,
});

export default logger;
