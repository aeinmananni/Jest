"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../script/block");
/**
 *   describe : میتوانیم دسته ای از بلاک هارا ایجاد کنیم
 *   it: با این بلاک میتوانیم تست های خودمان را بنویسیم
 *   expect: برسی رابرای ما انجام میدهد
 */
describe("BlockChain Test :", () => {
    const lastHash = "Last_Hash";
    const hash = "Hash";
    const data = ["BolckChanin", "Blokc"];
    const data1 = (0, block_1.block)({ lastHash, hash, data });
    // 1- خب حالا میخواهیم تست کنمی زمانی که بلاکی را ایجاد میکنیم خروجی برابر باشد با مقدار متغیر ها
    it("it hash timastamp,lasthash,hash,data Property", () => {
        expect(data1.lastHash).toEqual(lastHash);
        expect(data1.hash).toEqual(hash);
        expect(data1.data).toEqual(data);
    });
});
