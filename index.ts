import app from "./app";
import "dotenv-safe/config";
import "./redisController/subscriber";
import tcpPortUsed from "tcp-port-used";
import axios from "axios";
import { BlockChaine } from "./script";
import { blockchainInstance } from "./instance";

let port: number = Number(process.env.PORT) || 3030;
const rootPort: number = Number(process.env.PORT) || 3030;
const syncChains = async () => {
  const response = await axios.get(
    `http://localhost:${rootPort}/api/blocks/GET/All`
  );
  blockchainInstance.isChainReplaceMent(response.data);
};

tcpPortUsed.check(Number(port), "127.0.0.1").then((inUsed) => {
  if (inUsed) {
    port += Math.ceil(Math.random() * 1000);
  }
  app.listen(port, () => {
    console.log(`Listening on Port : ${port}`);
    if (port !== rootPort) syncChains();
  });
});
