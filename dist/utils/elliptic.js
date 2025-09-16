"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECModel = void 0;
const elliptic_1 = require("elliptic");
/**
 *  1- میتوانیم مشخص کنیم ابجکت بر چه اساسی باشد
 *  2- بلاکچین براین اساس کار میکند secp256k1
 *  3- پیاده سازی بیتکوین هست
 */
exports.ECModel = new elliptic_1.ec("secp256k1");
