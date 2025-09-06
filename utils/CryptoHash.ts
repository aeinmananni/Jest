import crypto, { BinaryLike } from 'crypto';

export const CryptohashFunction = (...input: unknown[]) => {
  const hash = crypto.createHash("sha256", {});
  const rdc = input.reduce((total, crr) => {
    return total + " " + JSON.stringify(crr);
  }, "");

  hash.update(rdc as BinaryLike);
  return hash.digest("hex");
};
// در این حالت بهجای فرم هگز فرم باینری درخروجی نمایش داده میشود
