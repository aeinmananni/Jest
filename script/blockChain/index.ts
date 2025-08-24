import { GENESIS } from "../../config/genesis.config";
import { BlockType } from "../../models";
import { block } from "../block";

export const BlockChaine = <T>() => {
  let chain: BlockType<string>[] = [GENESIS];

  return {
    addBlock(v: { data: T }) {
      const lastHash = chain[chain.length - 1].hash;
      const dataHash: string =
        typeof v.data === "string" ? v.data : JSON.stringify(v.data);
      const hash = `HASH > ${dataHash}`;
      chain = [...chain, block({ lastHash, hash, data: dataHash })];
    },
    getChain() {
      return chain;
    },
  };
};
