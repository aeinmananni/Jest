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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv-safe/config");
require("./redisController/subscriber");
const tcp_port_used_1 = __importDefault(require("tcp-port-used"));
const axios_1 = __importDefault(require("axios"));
const instance_1 = require("./instance");
let port = Number(process.env.PORT) || 3030;
const rootPort = Number(process.env.PORT) || 3030;
const syncChains = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://localhost:${rootPort}/api/blocks/GET/All`);
    instance_1.blockchainInstance.isChainReplaceMent(response.data);
});
tcp_port_used_1.default.check(Number(port), "127.0.0.1").then((inUsed) => {
    if (inUsed) {
        port += Math.ceil(Math.random() * 1000);
    }
    app_1.default.listen(port, () => {
        console.log(`Listening on Port : ${port}`);
        if (port !== rootPort)
            syncChains();
    });
});
