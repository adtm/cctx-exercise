import * as cluster from "cluster";

import app from "./app";
import config from "./config";

// if (cluster.isMaster) {
//   const cpuCount = require("os").cpus().length;
//   for (let i = 0; i < cpuCount; ++i) cluster.fork();

//   cluster.on("exit", (worker, code) => {
//     console.log(`Worker ${worker.process.id} died with ${code}`);
//   });
// } else {
app.listen(config, () => console.log(`..process ${process.pid} is up`));
// }

export default app;
