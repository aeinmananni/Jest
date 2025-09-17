"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../script/transaction");
const wallet_1 = require("../script/wallet");
describe("Transactions : ", () => {
    let transaction, senderWallet, recipient, amount;
    beforeEach(() => {
        senderWallet = (0, wallet_1.Wallet)().publicKey;
        recipient = "Recipient-public-key";
        amount = 50;
        transaction = (0, transaction_1.transaction)({ senderWallet, recipient, amount });
    });
});
