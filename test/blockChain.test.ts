import { GENESIS } from "../config/genesis.config";
import { BlockType } from "../models";
import { BlockChaine } from "../script";

describe("BlockChaine", () => {
  const blocks = BlockChaine<string>();
  blocks.addBlock({ data: `my First Data` });

  // انتظار داریم خروجی تابع بلاکچین از نوع ارایه باشه
  it("Contains a `Chain` Array Instance", () => {
    expect(blocks.getChain() instanceof Array).toBe(true);
  });

  //انتظار داریم اولین عنصر ارایه با جنسیس بلاک برابر باشه
  it("starts with the genesis block", () => {
    expect(blocks.getChain()[0]).toEqual(GENESIS);
  });
});

describe("isValidChain", () => {
  // این تست بررسی می‌کند که اگر بلاک اول زنجیره GENESIS نباشد، خطا برگردد
  it("should return error if the first block is not GENESIS", () => {
    const NEW_CHAIN = BlockChaine<{
      id: number;
      firstName: string;
      lastName: string;
    }>();

    // اضافه کردن یک بلاک معمولی
    NEW_CHAIN.addBlock({
      data: { id: 1, firstName: "ali", lastName: "rahimi" },
    });

    // دستکاری بلاک اول برای اینکه GENESIS نباشد
    const fakeGenesis = {
      lastHash: "fakeLastHash",
      hash: "fakeHash",
      difficulty: 3,
      nonce: 0,
      data: "333333",
      timeStamp: 33333,
    };
    NEW_CHAIN.getChain()[0] = fakeGenesis;
    const result = NEW_CHAIN.isValidChain(NEW_CHAIN.getChain());
    expect(result).toBe(false);
  });
});

describe("isChainReplaceMent", () => {
  it("should not replace if new chain is shorter or equal", () => {
    const bc = BlockChaine<{ name: string }>();
    bc.addBlock({ data: { name: "Alice" } });
    const newChain = [GENESIS];
    const originalChain = bc.getChain();
    bc.isChainReplaceMent(newChain);
    expect(bc.getChain()).toEqual(originalChain);
  });

  /// تست می‌کنیم که اگر زنجیره جدید معتبر نباشد،
  // زنجیره فعلی جایگزین نشود.
  it("should not replace if new chain is invalid", () => {
    const bc = BlockChaine<{ name: string }>();
    bc.addBlock({ data: { name: "Alice" } });

    const originalChain = bc.getChain();
    const newChain = [
      ...originalChain,
      {
        lastHash: "x",
        hash: "y",
        difficulty: 3,
        nonce: 0,
        data: "z",
        timeStamp: 3445,
      },
    ]; // بلاک نامعتبر

    bc.isChainReplaceMent(newChain);
    expect(bc.getChain()).toEqual(originalChain); // نباید جایگزین شود
  });

  // تست می‌کنیم که اگر زنجیره جدید معتبر و طولانی‌تر باشد،
  // زنجیره فعلی با زنجیره جدید جایگزین شود.
});
