import { randomUUID } from "crypto";
import { Wallet } from "../wallet";
import { VeryfySignature } from "../../utils/elliptic";
export type TransactionType = {
  id?: string;
  senderWallet: string;
  recipient: string;
  amount: number;
  senderBalance: number;
  sinature: string;
  createOutputMap: () => Record<string, number>;
  createInputMap: (output: Record<string, number>) => InputType;
  validateTransaction: (
    transaction: Pick<
      TransactionType,
      "createInputMap" | "createOutputMap" | "id"
    >
  ) => boolean;
};

type InputType = {
  timestamp: number;
  amount: number;
  address: string;
  signature: string;
};
export const transaction = (
  wallet: ReturnType<typeof Wallet>,
  recipient: string,
  amount: number
) => {
  return {
    id: randomUUID(),

    createOutputMap() {
      const outputMap: Record<string, number> = {};
      outputMap[recipient] = amount;
      outputMap[wallet.publicKey] = wallet.balance - amount;
      return outputMap;
    },

    createInputMap(outputMap: Record<string, number>): InputType {
      const inputAmount = Object.values(outputMap).reduce((a, b) => a + b, 0);
      return {
        timestamp: Date.now(),
        amount: inputAmount,
        address: wallet.publicKey,
        signature: wallet.sign(outputMap).toDER("hex"),
      };
    },

    validateTransaction(
      transaction: Pick<
        TransactionType,
        "createInputMap" | "createOutputMap" | "id"
      >
    ): boolean {
      const { createOutputMap, createInputMap } = transaction;
      const outputMap = createOutputMap();
      const totalOutput = Object.values(outputMap).reduce((a, b) => a + b, 0);
      const { amount, address, signature } = createInputMap(outputMap);

      if (amount !== totalOutput) return false;
      if (!VeryfySignature({ publicKey: address, data: outputMap, signature }))
        return false;

      return true;
    },
  };
};
