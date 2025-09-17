"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleWallet = void 0;
const _1 = require(".");
const wallet = (0, _1.Wallet)();
console.log("Publick Key : ", wallet.publicKey);
console.log("Balance : ", wallet.balance);
const ExampleWallet = () => {
    console.log("Publick Key : ", wallet.publicKey);
    console.log("Balance : ", wallet.balance);
};
exports.ExampleWallet = ExampleWallet;
