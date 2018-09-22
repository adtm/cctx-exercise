require("dotenv").config();

interface IConfig {
  port: number | string;
  prettyLog: boolean;
}

const config: IConfig = {
  port: process.env.PORT || 3000,
  prettyLog: process.env.NODE_ENV === "development"
};

export default config;
