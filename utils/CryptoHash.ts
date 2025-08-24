import crypto from "crypto";

export const CryptohashFunction = <T>(...input: T[]) => {
  const hash = crypto.createHash("sha256", {});
  const rdc = input.reduce((total, crr) => {
    return total + " " + JSON.stringify(crr);
  }, "");

  hash.update(rdc);
  return hash.digest("hex");
};
