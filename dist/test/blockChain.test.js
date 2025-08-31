"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_config_1 = require("../config/genesis.config");
const script_1 = require("../script");
describe("BlockChaine", () => {
    const blocks = (0, script_1.BlockChaine)();
    blocks.addBlock({ data: `my First Data` });
    // انتظار داریم خروجی تابع بلاکچین از نوع ارایه باشه
    it("Contains a `Chain` Array Instance", () => {
        expect(blocks.getChain() instanceof Array).toBe(true);
    });
    //انتظار داریم اولین عنصر ارایه با جنسیس بلاک برابر باشه
    it("starts with the genesis block", () => {
        expect(blocks.getChain()[0]).toEqual(genesis_config_1.GENESIS);
    });
});
describe("isValidChain", () => {
    // این تست بررسی می‌کند که اگر بلاک اول زنجیره GENESIS نباشد، خطا برگردد
    it("should return error if the first block is not GENESIS", () => {
        const NEW_CHAIN = (0, script_1.BlockChaine)();
        // اضافه کردن یک بلاک معمولی
        NEW_CHAIN.addBlock({
            data: { id: 1, firstName: "ali", lastName: "rahimi" },
        });
        // دستکاری بلاک اول برای اینکه GENESIS نباشد
        const fakeGenesis = {
            lastHash: "fakeLastHash",
            hash: "fakeHash",
            data: "333333",
            timeStamp: 33333,
        };
        NEW_CHAIN.getChain()[0] = fakeGenesis;
        const result = NEW_CHAIN.isValidChain(NEW_CHAIN.getChain());
        expect(result).toBe("is Not Instance fo GENESIS Block!");
    });
});
