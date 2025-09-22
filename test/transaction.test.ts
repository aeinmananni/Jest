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

describe("Transaction update()", () => {
  let wallet: ReturnType<typeof Wallet>;
  let transaction: ReturnType<typeof Transaction>;

  beforeEach(() => {
    wallet = Wallet();
    transaction = Transaction(wallet, "recipient-1", 50);
  });

  it("should add a new recipient to the outputMap", () => {
    const updated = transaction.update({
      recipient: "recipient-2",
      amount: 30,
    });
    const outputMap = updated.createOutputMap();

    expect(outputMap["recipient-2"]).toBe(30);
    expect(outputMap[wallet.publicKey]).toBe(wallet.balance - 50 - 30);
  });

  it("should update an existing recipient amount", () => {
    const updated = transaction.update({
      recipient: "recipient-1",
      amount: 20,
    });
    const outputMap = updated.createOutputMap();

    expect(outputMap["recipient-1"]).toBe(70);
    expect(outputMap[wallet.publicKey]).toBe(wallet.balance - 70);
  });

  it("should decrease the sender balance correctly", () => {
    const updated = transaction.update({
      recipient: "recipient-2",
      amount: 40,
    });
    const outputMap = updated.createOutputMap();

    expect(outputMap[wallet.publicKey]).toBe(wallet.balance - 90); // 50 + 40
  });

  it("should throw error if amount exceeds balance", () => {
    expect(() => {
      transaction.update({ recipient: "attacker", amount: 999999 });
    }).toThrow("amount exceeds balance");
  });
});
