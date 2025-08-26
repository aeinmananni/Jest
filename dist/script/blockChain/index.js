"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChaine = void 0;
const genesis_config_1 = require("../../config/genesis.config");
const CryptoHash_1 = require("../../utils/CryptoHash");
const block_1 = require("../block");
const BlockChaine = () => {
    let chain = [genesis_config_1.GENESIS];
    return {
        addBlock(v) {
            const lastHash = chain[chain.length - 1].hash;
            const dataHash = typeof v.data === 'string' ? v.data : JSON.stringify(v.data);
            const hash = (0, CryptoHash_1.CryptohashFunction)(v.data, lastHash);
            chain = [...chain, (0, block_1.block)({ lastHash, hash, data: dataHash })];
        },
        getChain() {
            return chain;
        },
    };
};
exports.BlockChaine = BlockChaine;
