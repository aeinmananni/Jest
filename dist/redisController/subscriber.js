"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("../instance");
const channels_1 = require("./channels");
const redis_1 = require("./redis");
redis_1.subscriber.subscribe(channels_1.CHANNELS.BLOCK, channels_1.CHANNELS.TRANSACTION, (err, count) => {
    if (err)
        console.error(err);
    else
        console.log(`Subscribed to ${count} channel(s)`);
});
redis_1.subscriber.on("message", (channel, message) => {
    if (channel === channels_1.CHANNELS.BLOCK) {
        const newBlock = JSON.parse(message);
        instance_1.blockchainInstance.addBlock({ data: newBlock, fromNetwork: true });
        console.log("Received new block:", newBlock);
    }
});
