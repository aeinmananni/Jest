import app from "./app";
import "dotenv-safe/config";
import "./redisController/subscriber";
import tcpPortUsed from "tcp-port-used";
import axios from "axios";
import { blockchainInstance } from "./instance";
let port: number = Number(process.env.PORT) || 3030;
const rootPort: number = Number(process.env.PORT) || 3030;
const peers = process.env.PEERS || "";




const syncChains = async () => {
  try {
    const response = await axios.get(`${peers}/api/blocks/GET/All`);
    blockchainInstance.isChainReplaceMent(response.data);
  } catch (error: any) {
    console.error("Sync failed:", error.message);
  }
};

tcpPortUsed.check(Number(port), "127.0.0.1").then((inUse) => {
  if (inUse) {
    port += Math.ceil(Math.random() * 1000);
  }
  app.listen(port, () => {
    console.log(`Listening on Port : ${port}`);
    if (port !== rootPort) syncChains();
  });
});
