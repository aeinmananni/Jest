"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const genesis_config_1 = require("../../config/genesis.config");
const elliptic_1 = require("../../utils/elliptic");
const CryptoHash_1 = require("../../utils/CryptoHash");
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
const Wallet = () => {
    var _a;
    const KEY_PAIR = elliptic_1.ECModel.genKeyPair();
    const balance = genesis_config_1.STARTING_BALANCE;
    const publicKey = (_a = KEY_PAIR["getPublic"]()) === null || _a === void 0 ? void 0 : _a.encode("hex", false);
    return {
        balance,
        publicKey,
        sign(data) {
            const dataHash = (0, CryptoHash_1.CryptohashFunction)(data);
            return KEY_PAIR.sign(dataHash);
        },
    };
};
exports.Wallet = Wallet;
