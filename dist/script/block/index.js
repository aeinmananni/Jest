"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.block = void 0;
const block = (v) => {
    return Object.assign(Object.assign({}, v), { timeStamp: Date.now() });
};
exports.block = block;
