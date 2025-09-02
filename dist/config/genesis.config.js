"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENESIS = void 0;
const block_1 = require("../script/block");
const INITAIL_DIFFICULTY = 3;
exports.GENESIS = (0, block_1.block)({
    lastHash: "Gen-lastHash",
    hash: "Gen-hash",
    difficulty: INITAIL_DIFFICULTY,
    nonce: 0,
    data: "Gen-data",
});
