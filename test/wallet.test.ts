import { Wallet } from "../script/wallet";
import { VeryfySignature } from "../utils/elliptic";

describe("Wallet Test : ", () => {
  const Wallet_Example = Wallet();
  const data = { amount: 100, to: "0x123" };

  const sinature = Wallet_Example.sign(data).toDER("hex");
  it("Return True and Valid Signature", () => {
    expect(
      VeryfySignature({
        publicKey: Wallet_Example.publicKey,
        data,
        signature: sinature,
      })
    ).toBe(true);
  });

  it("Return False and not Valid Signtaur", () => {
    expect(
      VeryfySignature({
        publicKey: Wallet_Example.publicKey,
        data: { amount: 999, to: "0x123" },
        signature: sinature,
      })
    ).toBe(false);
  });
});
