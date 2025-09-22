import { Wallet } from "../script/wallet";
import { VeryfySignature } from "../utils/elliptic";

describe("Wallet Test : ", () => {
  const Wallet_Example = Wallet();
  const data = { amount: 100, to: "0x123" };

  const signature = Wallet_Example.sign(data).toDER("hex");
  it("Return True and Valid Signature", () => {
    expect(
      VeryfySignature({
        publicKey: Wallet_Example.publicKey,
        data,
        signature,
      })
    ).toBe(true);
  });

  it("Return False and not Valid Signtaur", () => {
    expect(
      VeryfySignature({
        publicKey: Wallet_Example.publicKey,
        data: { amount: 999, to: "0x123" },
        signature,
      })
    ).toBe(false);
  });
});




describe("Wallet createTransaction", () => {
  let wallet: ReturnType<typeof Wallet>;

  beforeEach(() => {
    wallet = Wallet();
  });

  it("should throw an error if amount exceeds balance", () => {
    const recipient = "fake-recipient";
    const amount = wallet.balance + 1; // بیشتر از موجودی

    expect(() => {
      wallet.createTransaction({ recipient, amount });
    }).toThrow("amount exceeds balance");
  });

  it("should create a transaction if amount is valid", () => {
    const recipient = "fake-recipient";
    const amount = 50;

    const tx = wallet.createTransaction({ recipient, amount });

    expect(tx).toBeDefined();
    expect(tx.id).toBeDefined();
    expect(tx.createOutputMap()).toHaveProperty(recipient, amount);
  });
});
