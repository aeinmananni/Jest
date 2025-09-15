import { GENESIS, MINE_RATE } from "../../config/genesis.config";
import { BlockType } from "../../models";
import { CryptohashFunction } from "../../utils/CryptoHash";
import { block } from "../block";
import hexToBinary from "hex-to-binary";

export const BlockChaine = <T>() => {
  let chain: BlockType[] = [GENESIS];

  return {
    addJustDifficulty(v: {
      originalBlock: Pick<BlockType, "difficulty" | "timeStamp">;
      timestamp: number;
    }) {
      const { difficulty, timeStamp } = v.originalBlock;
      if (difficulty < 1) return 1;
      if (v.timestamp - timeStamp > MINE_RATE) return difficulty - 1;
      return difficulty + 1;
    },

    addBlock(v: { data: T | null; fromNetwork?: boolean }): BlockType {
      if (
        v.fromNetwork &&
        v.data &&
        typeof v.data === "object" &&
        "hash" in v.data
      ) {
        const incomingBlock = v.data as unknown as BlockType;

        // اگر بلاک قبلاً وجود داشته، اضافه نکن
        if (chain.find((b) => b.hash === incomingBlock.hash)) {
          return incomingBlock;
        }

        chain = [...chain, incomingBlock];
        return incomingBlock;
      }

      if (v.data == null) {
        throw new Error("Cannot add null block data");
      }

      // بلاک جدید ماین شده
      const lastBlock = chain[chain.length - 1];
      const lastHash = lastBlock.hash;
      const difficulty = lastBlock.difficulty;
      const timeStamp = lastBlock.timeStamp;

      let newDifficulty = difficulty;
      let hash: string;
      let nonce = 0;
      const dataHash: string =
        typeof v.data === "string" ? v.data : JSON.stringify(v.data);

      let timestamp: number;

      do {
        nonce++;
        timestamp = Date.now();
        newDifficulty = this.addJustDifficulty({
          originalBlock: { difficulty, timeStamp },
          timestamp,
        });
        hash = CryptohashFunction(dataHash, lastHash, nonce, newDifficulty);
      } while (
        hexToBinary(hash).substring(0, newDifficulty) !==
        "0".repeat(newDifficulty)
      );

      const newBlock = block({
        lastHash,
        hash,
        data: dataHash,
        difficulty: newDifficulty,
        nonce,
      });

      chain = [...chain, newBlock];
      return newBlock;
    },
    isValidChain(chain: BlockType[]) {
      if (JSON.stringify(chain[0]) !== JSON.stringify(GENESIS)) return false;
      for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const actualLastHash = chain[i - 1].hash;
        const actualDifficulty = chain[i - 1].difficulty;
        const { lastHash, hash, data, nonce, difficulty } = block;

        if (lastHash !== actualLastHash) return false;
        if (Math.abs(actualDifficulty - difficulty) > 1) return false;

        if (
          hash !== CryptohashFunction(data, lastHash, nonce, actualDifficulty)
        )
          return false;
      }
      return true;
    },

    isChainReplaceMent(newChain: BlockType[]) {
      if (newChain.length <= chain.length) return;
      if (!this.isValidChain(newChain)) return;
      console.log("Replacing chain with length:", newChain.length);
      chain = newChain;
    },

    getChain() {
      return chain;
    },
  };
};

/**
 *    1- خب حالا ما توانستیم پروف اف ورک را پیاده سازی کنیم به نوعی میخواستیم ماینر ها برای اضافه کردن
 *    یک بلاک جدید انرژی محاسباتی نیز تلف کنند
 *
 *
 *    2- هرچی ماینر های بیشتری به شبکه اضافه بشه بلاک ها با سرعت بیشتری به شبکه اضافه میشن
 *       چون قدرت محاسباتی شبکه بالا رفته است
 *       خب ما میخواهیم بسته به ماین شدن بلاک ها مقدار دیفیکالتی نیز تغغیر کند
 *       برای مثال میخوام هر 5 ثانیه یک بلاک جدید به شبکه اضافه بشه
 *       اگر این اتفاق داره زیر 5 ثانیه می افته باید دیفیکالتی رو بیشتر کنیم
 *       و اگر 20 ثانیه طول کشیده تا یک بلاک جدید به شبکه اضافه بشه باید دیفیکالتی را
 *       پایین تر بی اوریم
 *
 *       mineRate:
 *                  خب حالا میخواهیم یم ماین ریت در برنامه قرار دهیم
 *                  اگر ماین ریت ما برابر با 5 باشد یعنی هر 5ثانیه
 *                  یکبار یک بلاک جدید به برنامه اضافه شودوالبته این
 *                  مقدار را دربرنامه برحسب میلی ثانبه میگوییم
 *                  و حالا اگر یک بلاک جدید اضافه شد تایم استنپ ان را با
 *                  تایم استنپ قبلی مقایسه میکنیم   و از این مقایسه
 *                  و میتوانیم بفهمیم چه مدت زمانی از ماین شدن بلاک قبلی گذشته
 *
 *
 *
 *
 *
 *
 */
