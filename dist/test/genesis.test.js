"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const genesis_config_1 = require("../config/genesis.config");
describe('Genesis', () => {
    //1-  نمونه ای از کلاس ابجکت باشد GENESIS  انتظار دارم ابجکت
    it('returns Genesis Objects', () => {
        expect(genesis_config_1.GENESIS instanceof Object).toEqual(true);
    });
    // 1- تست اینکه مقدارش دقیقا برابر چیزی باشه که تعریف کردی
    it('hash corretct properties in GENESIS object', () => {
        expect(genesis_config_1.GENESIS.lastHash).toBe('Gen-lastHash');
        expect(genesis_config_1.GENESIS.hash).toBe('Gen-hash');
        expect(genesis_config_1.GENESIS.data).toBe('Gen-data');
    });
    //2- تست اینکه کلیدهای ضروری داخلش باشن (ساختارش تغییر نکنه)
    it('GENESIS should contain lastHash,hash,data', () => {
        expect(genesis_config_1.GENESIS).toHaveProperty('timeStamp');
        expect(genesis_config_1.GENESIS).toHaveProperty('lastHash');
        expect(genesis_config_1.GENESIS).toHaveProperty('hash');
        expect(genesis_config_1.GENESIS).toHaveProperty('data');
    });
    //3- تست اینکه فقط همون کلیدها رو داشته باشه (بیشتر/کمتر نشه)
    it("GENESIS should not have extra properties", () => {
        const keys = Object.keys(genesis_config_1.GENESIS);
        expect(keys).toEqual([
            "lastHash",
            "hash",
            "difficulty",
            "nonce",
            "data",
            "timeStamp",
        ]);
    });
    // 4- تست مقدارتایپ ها
    it("GENESIS values should be string type", () => {
        expect(typeof genesis_config_1.GENESIS["lastHash"]).toBe("string");
        expect(typeof genesis_config_1.GENESIS["hash"]).toBe("string");
        expect(typeof genesis_config_1.GENESIS["data"]).toBe("string");
        expect(typeof genesis_config_1.GENESIS["timeStamp"]).toBe("number");
    });
    // 5- برای تست تغییررات ناخواسته
    it("matches the GENESIS snapshot", () => {
        const { timeStamp } = genesis_config_1.GENESIS, rest = __rest(genesis_config_1.GENESIS, ["timeStamp"]);
    });
});
