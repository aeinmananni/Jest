"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChaine = void 0;
const genesis_1 = require("../../data/genesis");
const block_1 = require("../block");
const BlockChaine = () => {
    let chain = [genesis_1.GENESIS];
    return {
        addBlock(v) {
            const lastHash = chain[chain.length - 1].hash;
            const dataHash = typeof v.data === "string" ? v.data : JSON.stringify(v.data);
            const hash = `HASH > ${dataHash}`;
            chain = [...chain, (0, block_1.block)({ lastHash, hash, data: dataHash })];
        },
        getChain() {
            return chain;
        },
    };
};
exports.BlockChaine = BlockChaine;
