import { GENESIS } from '../../config/genesis.config';
import { BlockType } from '../../models';
import { CryptohashFunction } from '../../utils/CryptoHash';
import { block } from '../block';

export const BlockChaine = <T>() => {
  let chain: BlockType<string>[] = [GENESIS];

  return {
    addBlock(v: { data: T }) {
      const lastHash = chain[chain.length - 1].hash;
      const difficulty = chain[chain.length - 1].difficulty; // مانند فیلد هش دیفیکالتی را هم از بلاک قبل دریافت میکنیم
      const nonce = 0;
      const dataHash: string =
        typeof v.data === "string" ? v.data : JSON.stringify(v.data);
      const hash = CryptohashFunction(v.data, lastHash, nonce, difficulty);
      chain = [
        ...chain,
        block({ lastHash, hash, data: dataHash, difficulty, nonce }),
      ];
    },

    isValidChain(chain: BlockType<string>[]) {
      if (JSON.stringify(chain[0]) !== JSON.stringify(GENESIS)) return false;
      for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const actualLastHash = chain[i - 1].hash;
        const actualDifficulty = chain[i - 1].difficulty;
        const nonce = 0;
        const { lastHash, hash, data } = block;
        if (lastHash !== actualLastHash) return false;
        if (
          hash !== CryptohashFunction(data, lastHash, nonce, actualDifficulty)
        )
          return false;
      }

      return true;
    },

    isChainReplaceMent(newChain: BlockType<string>[]) {
      if (newChain.length <= chain.length) return;
      if (!this.isValidChain(newChain)) return;
      chain = newChain;
    },

    getChain() {
      return chain;
    },
  };
};
