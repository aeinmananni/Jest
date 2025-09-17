"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("../script/wallet");
const elliptic_1 = require("../utils/elliptic");
describe("Wallet Test : ", () => {
    const Wallet_Example = (0, wallet_1.Wallet)();
    const data = { amount: 100, to: "0x123" };
    const signature = Wallet_Example.sign(data).toDER("hex");
    it("Return True and Valid Signature", () => {
        expect((0, elliptic_1.VeryfySignature)({
            publicKey: Wallet_Example.publicKey,
            data,
            signature,
        })).toBe(true);
    });
    it("Return False and not Valid Signtaur", () => {
        expect((0, elliptic_1.VeryfySignature)({
            publicKey: Wallet_Example.publicKey,
            data: { amount: 999, to: "0x123" },
            signature,
        })).toBe(false);
    });
});
