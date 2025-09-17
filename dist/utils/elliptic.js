"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeryfySignature = exports.ECModel = void 0;
const elliptic_1 = require("elliptic");
const CryptoHash_1 = require("./CryptoHash");
/**
 *  1- میتوانیم مشخص کنیم ابجکت بر چه اساسی باشد
 *  2- بلاکچین براین اساس کار میکند secp256k1
 *  3- پیاده سازی بیتکوین هست
 *
 *  -------------------------------------------
 *  رو انجام بدیم veryfy خب حالا میخواهیم عملیات
 *   برای اعتبار سنجی دیتا میتوانیم از ابجکت ec
 *   استفاده کنیم
 *   key و این متد ابجکت کی به ما میدهد ولی فط ابن متد در یک ابجکت
 *   در دسترس است
 *   برای گرفتن ابجکت کی میتوانیم از همین کلید عمومی
 *   استفاده کنیم
 *   key خب حالا میتوانیم توسط متد وری فای که این
 *   به ما میدهد امضا را اعتبار سنجی کنیم
 *
 *
 * -----------------------------------------------------
 *  روند این این کار به این صورت است
 *  که این متد میادامضا رو به وسیله کلید عمومی
 *  قرار داره دی کد میکنه keyFromPublic که درون
 *  تا به دیتا برسه اگر این دیتا
 *  به دیتای دریافت شده یکی بود
 *  امضا ما امضا درستی خواهد بود
 *
 *
 *
 */
exports.ECModel = new elliptic_1.ec("secp256k1");
const VeryfySignature = (v) => {
    const keyFromPublic = exports.ECModel.keyFromPublic(v.publicKey, "hex");
    const hashData = (0, CryptoHash_1.CryptohashFunction)(v.data);
    return keyFromPublic.verify(hashData, v.signature);
};
exports.VeryfySignature = VeryfySignature;
