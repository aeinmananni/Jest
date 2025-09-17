export const transaction = (v: {
  senderWallet: string;
  recipient: string;
  amount: number;
}) => {
  return v.senderWallet, v.recipient, v.amount;
};
