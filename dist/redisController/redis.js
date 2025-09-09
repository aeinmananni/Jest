"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriber = exports.publisher = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.publisher = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379,
});
exports.subscriber = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379,
});
exports.publisher.on("connect", () => console.log("Publisher connected to Redis"));
exports.subscriber.on("connect", () => console.log("Subscriber connected to Redis"));
// خطای اتصال
exports.publisher.on("error", (err) => console.error("Publisher Redis error:", err));
exports.subscriber.on("error", (err) => console.error("Subscriber Redis error:", err));
