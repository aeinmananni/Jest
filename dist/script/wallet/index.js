"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const genesis_config_1 = require("../../config/genesis.config");
const elliptic_1 = require("../../utils/elliptic");
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
 */
const KEY_PAIR = elliptic_1.ECModel.genKeyPair();
const Wallet = () => {
    var _a;
    const balence = genesis_config_1.STARTING_BALANCE;
    const publicKey = (_a = KEY_PAIR["getPublic"]()) === null || _a === void 0 ? void 0 : _a.encode("hex", false);
    return { balence, publicKey };
};
exports.Wallet = Wallet;
