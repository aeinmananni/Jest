"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENESIS = exports.MINE_RATE = void 0;
const block_1 = require("../script/block");
const INITAIL_DIFFICULTY = 3;
exports.MINE_RATE = 1000; //برابر با هزار میلی ثانیه و در واقع میخواهیم هر بیک ثانیه یک بار یک بلاک جدید به شبکه اضافه شود
exports.GENESIS = (0, block_1.block)({
    lastHash: "Gen-lastHash",
    hash: "Gen-hash",
    difficulty: INITAIL_DIFFICULTY,
    nonce: 0,
    data: "Gen-data",
});
