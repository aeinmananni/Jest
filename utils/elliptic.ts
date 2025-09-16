import { ec as EC } from "elliptic";
/**
 *  1- میتوانیم مشخص کنیم ابجکت بر چه اساسی باشد
 *  2- بلاکچین براین اساس کار میکند secp256k1
 *  3- پیاده سازی بیتکوین هست
 */

export const ECModel = new EC("secp256k1");
