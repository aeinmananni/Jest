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
            const dataHash = typeof v.data === "string" ? v.data : JSON.stringify(v.data);
            const hash = (0, CryptoHash_1.CryptohashFunction)(v.data, lastHash);
            chain = [...chain, (0, block_1.block)({ lastHash, hash, data: dataHash })];
        },
        isValidChain(chain) {
            if (chain[0] !== genesis_config_1.GENESIS)
                return "is Not Instance fo GENESIS Block!";
            for (let i = 1; i < chain.length; i++) {
                const block = chain[i];
                const actualLastHash = chain[i - 1].hash;
                const { lastHash, hash, data } = block;
                if (lastHash !== actualLastHash)
                    return "lastHash Not Valid!";
                if (hash !== (0, CryptoHash_1.CryptohashFunction)(data, lastHash))
                    return "hash is not valid in Block Chains!";
            }
            return "blockChain Validate Completed Success fully is is not Problme!";
        },
        getChain() {
            return chain;
        },
    };
};
exports.BlockChaine = BlockChaine;
