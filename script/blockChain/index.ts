import { GENESIS } from '../../config/genesis.config';
import { BlockType } from '../../models';
import { CryptohashFunction } from '../../utils/CryptoHash';
import { block } from '../block';

export const BlockChaine = <T>() => {
  let chain: BlockType<string>[] = [GENESIS];

  return {
    addBlock(v: { data: T }) {
      const lastHash = chain[chain.length - 1].hash;
      const dataHash: string =
        typeof v.data === "string" ? v.data : JSON.stringify(v.data);
      const hash = CryptohashFunction(v.data, lastHash);
      chain = [...chain, block({ lastHash, hash, data: dataHash })];
    },
    isValidChain(chain: BlockType<string>[]) {
      if (chain[0] !== GENESIS) return "is Not Instance fo GENESIS Block!";
      for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const actualLastHash = chain[i - 1].hash;
        const { lastHash, hash, data } = block;
        if (lastHash !== actualLastHash) return "lastHash Not Valid!";
        if (hash !== CryptohashFunction(data, lastHash))
          return "hash is not valid in Block Chains!";
      }

      return "blockChain Validate Completed Success fully is is not Problme!";
    },
    getChain() {
      return chain;
    },
  };
};
