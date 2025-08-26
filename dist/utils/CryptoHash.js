"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptohashFunction = void 0;
const crypto_1 = __importDefault(require("crypto"));
const CryptohashFunction = (...input) => {
    const hash = crypto_1.default.createHash('sha256', {});
    const rdc = input.reduce((total, crr) => {
        return total + ' ' + JSON.stringify(crr);
    }, '');
    hash.update(rdc);
    return hash.digest('hex');
};
exports.CryptohashFunction = CryptohashFunction;
