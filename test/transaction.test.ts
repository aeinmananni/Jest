import { transaction as Transaction } from "../script/transaction";
import { Wallet } from "../script/wallet";

describe("Transactions : ", () => {
  let transaction, senderWallet, recipient, amount;
  beforeEach(() => {
    senderWallet = Wallet().publicKey;
    recipient = "Recipient-public-key";
    amount = 50;
    transaction = Transaction({ senderWallet, recipient, amount });
  });
});
