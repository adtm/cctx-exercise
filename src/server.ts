import * as cluster from "cluster";

import app from "./app";
import config from "./config";
import logger from "./helpers/logger";

if (cluster.isMaster) {
  const cpuCount = require("os").cpus().length;

  for (let i = 0; i < cpuCount; ++i) {
    cluster.fork();
  }

  cluster.on("exit", (worker: cluster.Worker, code: number) => {
    logger.error(`Worker ${worker.id} died with ${code}`);
    cluster.fork();
  });
} else {
  app.listen(config, () => logger.info(`..worker ${process.pid} is up`));
}

export default app;
