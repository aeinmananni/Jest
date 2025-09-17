import { STARTING_BALANCE } from "../../config/genesis.config";
import { ECModel } from "../../utils/elliptic";
import { CryptohashFunction } from "../../utils/CryptoHash";

/**
 *   public key به جای ادرس بهش میگیم
 *   چون براساس یک جفت کلید رمزنگاری عمومی و خصوصی
 *   تشکیل شده است و خوده ان به تناهیی معنایی ندارد
 *   دلیل ایجاد کردنش اینه صاحب کیف پول بتونه تراکنش اجرا کنه
 *
 *   ECModel :
 *             است getKeyPair این ابجکت حاوی متدی بنام
 *             که میتواند یک ابجکت جفت کلید قدرت مند ایجاد  کند
 *              خب 2 تا متد بهمون میده یکی برای کلید عمومی
 *              و دیگری برای کلید خصوصی
 *              getPublic , getPrivate
 *
 *  sign :
 *        خب ما برای ساین کردن نیاز به کلید خصوصی داریم
 *        قرار دارد KEY_PAIR  و این کلید خصوصی که درون
 *
 */

export const Wallet = () => {
  const KEY_PAIR = ECModel.genKeyPair();
  const balance: number = STARTING_BALANCE;
  const publicKey: string = KEY_PAIR["getPublic"]()?.encode("hex", false);

  return {
    balance,
    publicKey,

    sign<T>(data: T) {
      const dataHash = CryptohashFunction(data);
      return KEY_PAIR.sign(dataHash);
    },
  };
};
