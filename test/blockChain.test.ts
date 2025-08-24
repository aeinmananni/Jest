import { block } from "../script/block";
import { GENESIS } from "../config/genesis.config";
/**
 *   describe : میتوانیم دسته ای از بلاک هارا ایجاد کنیم
 *   it: با این بلاک میتوانیم تست های خودمان را بنویسیم
 *   expect: برسی رابرای ما انجام میدهد
 * 🔹 toBe:

از Object.is استفاده می‌کنه → یعنی مقایسه‌ی strict equality (===).

بیشتر برای primitive type‌ها (string, number, boolean, null, undefined) استفاده می‌شه.

همچنین برای این‌که مطمئن بشی دو مقدار دقیقا همون reference هستن.

-----------------------------------------------------------------------
to Equal :
    مقایسه‌ی deep equality انجام میده.
برای object و array کاربرد داره، چون فقط مقدارها رو بررسی می‌کنه نه reference.
 */

describe("BlockChain Test :", () => {
  const lastHash = "Last_Hash";
  const hash = "Hash";
  const data = ["BolckChanin", "Blokc"];

  const data1 = block<string[]>({ lastHash, hash, data });

  // 1- خب حالا میخواهیم تست کنمی زمانی که بلاکی را ایجاد میکنیم خروجی برابر باشد با مقدار متغیر ها

  it("it hash timastamp,lasthash,hash,data Property", () => {
    expect(data1.lastHash).toEqual(lastHash);
    expect(data1.hash).toEqual(hash);
    expect(data1.data).toEqual(data);
  });
});

//----------------------------------------------------------------------------------
describe("Genesis", () => {
  //1-  نمونه ای از کلاس ابجکت باشد GENESIS  انتظار دارم ابجکت
  it("returns Genesis Objects", () => {
    expect(GENESIS instanceof Object).toEqual(true);
  });

  // 1- تست اینکه مقدارش دقیقا برابر چیزی باشه که تعریف کردی
  it("hash corretct properties in GENESIS object", () => {
    expect(GENESIS.lastHash).toBe("Gen-lastHash");
    expect(GENESIS.hash).toBe("Gen-hash");
    expect(GENESIS.data).toBe("Gen-data");
  });

  //2- تست اینکه کلیدهای ضروری داخلش باشن (ساختارش تغییر نکنه)
  it("GENESIS should contain lastHash,hash,data", () => {
    expect(GENESIS).toHaveProperty("timeStamp");
    expect(GENESIS).toHaveProperty("lastHash");
    expect(GENESIS).toHaveProperty("hash");
    expect(GENESIS).toHaveProperty("data");
  });

  //3- تست اینکه فقط همون کلیدها رو داشته باشه (بیشتر/کمتر نشه)
  it("GENESIS should not have extra properties", () => {
    const keys = Object.keys(GENESIS);
    expect(keys).toEqual(["lastHash", "hash", "data", "timeStamp"]);
  });

  // 4- تست مقدارتایپ ها
  it("GENESIS values should be string type", () => {
    expect(typeof GENESIS["lastHash"]).toBe("string");
    expect(typeof GENESIS["hash"]).toBe("string");
    expect(typeof GENESIS["data"]).toBe("string");
    expect(typeof GENESIS["timeStamp"]).toBe("number");
  });

  // 5- برای تست تغییررات ناخواسته
  it("matches the GENESIS snapshot", () => {
    const { timeStamp, ...rest } = GENESIS;
    expect(rest).toMatchSnapshot();
  });
});

// describe("MainBlock", () => {});
