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
            const difficulty = chain[chain.length - 1].difficulty; // مانند فیلد هش دیفیکالتی را هم از بلاک قبل دریافت میکنیم
            const nonce = 0;
            const dataHash = typeof v.data === "string" ? v.data : JSON.stringify(v.data);
            const hash = (0, CryptoHash_1.CryptohashFunction)(v.data, lastHash, nonce, difficulty);
            chain = [
                ...chain,
                (0, block_1.block)({ lastHash, hash, data: dataHash, difficulty, nonce }),
            ];
        },
        isValidChain(chain) {
            if (JSON.stringify(chain[0]) !== JSON.stringify(genesis_config_1.GENESIS))
                return false;
            for (let i = 1; i < chain.length; i++) {
                const block = chain[i];
                const actualLastHash = chain[i - 1].hash;
                const actualDifficulty = chain[i - 1].difficulty;
                const nonce = 0;
                const { lastHash, hash, data } = block;
                if (lastHash !== actualLastHash)
                    return false;
                if (hash !== (0, CryptoHash_1.CryptohashFunction)(data, lastHash, nonce, actualDifficulty))
                    return false;
            }
            return true;
        },
        isChainReplaceMent(newChain) {
            if (newChain.length <= chain.length)
                return;
            if (!this.isValidChain(newChain))
                return;
            chain = newChain;
        },
        getChain() {
            return chain;
        },
    };
};
exports.BlockChaine = BlockChaine;
