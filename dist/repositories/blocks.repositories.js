"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBlocks = exports.GetBlocks = void 0;
const instance_1 = require("../instance");
const channels_1 = require("../redisController/channels");
const redis_1 = require("../redisController/redis");
const GetBlocks = () => __awaiter(void 0, void 0, void 0, function* () {
    return instance_1.blockchainInstance.getChain();
});
exports.GetBlocks = GetBlocks;
const addBlocks = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlock = instance_1.blockchainInstance.addBlock({ data });
    yield redis_1.publisher.publish(channels_1.CHANNELS.BLOCK, JSON.stringify(newBlock));
    return true;
});
exports.addBlocks = addBlocks;
