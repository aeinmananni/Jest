import {
  transaction as Transaction,
  TransactionType,
} from "../script/transaction";
import { Wallet } from "../script/wallet";

describe("Transactions : ", () => {
  let transaction: Pick<
      TransactionType,
      "createInputMap" | "createOutputMap" | "id" | "validateTransaction"
    >,
    senderWallet: string,
    recipient: string,
    amount: number,
    senderBalance: number;

  beforeEach(() => {
    const wallet = Wallet();
    senderWallet = wallet.publicKey;
    senderBalance = wallet.balance;
    recipient = "Recipient-public-key";
    amount = 50;

    transaction = Transaction(wallet, recipient, amount);
  });

  it("should generate a unique id", () => {
    expect(transaction.id).toBeDefined();
  });

  it("should create correct outputMap", () => {
    const outputMap = transaction?.createOutputMap
      ? transaction?.createOutputMap()
      : null;

    expect(outputMap?.[recipient]).toBe(amount);
    expect(outputMap?.[senderWallet]).toBe(senderBalance - amount);
  });
  it("should create correct inputMap with valid balance", () => {
    const outputMap = transaction.createOutputMap();
    const inputMap = transaction.createInputMap(outputMap);

    expect(inputMap.amount).toBe(senderBalance);
  });

  it("should sign the outputMap correctly", () => {
    const outputMap = transaction.createOutputMap();
    const inputMap = transaction.createInputMap(outputMap);

    expect(typeof inputMap.signature).toBe("string");
    expect(inputMap.signature.length).toBeGreaterThan(0);
  });

  it("should validate a correct transaction", () => {
    const isValid = transaction.validateTransaction(transaction);
    expect(isValid).toBe(true);
  });
  it("should invalidate tampered transaction", () => {
    const outputMap = transaction.createOutputMap();
    outputMap["attacker"] = 999999;

    const fakeTransaction = {
      ...transaction,
      createOutputMap: () => outputMap,
      createInputMap: () =>
        transaction.createInputMap(transaction.createOutputMap()),
    };

    const isValid = transaction.validateTransaction(fakeTransaction);
    expect(isValid).toBe(false);
  });
});
