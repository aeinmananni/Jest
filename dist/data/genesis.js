"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENESIS = void 0;
const block_1 = require("../script/block");
exports.GENESIS = (0, block_1.block)({
    lastHash: "Gen-lastHash",
    hash: "Gen-hash",
    data: "Gen-data",
});
