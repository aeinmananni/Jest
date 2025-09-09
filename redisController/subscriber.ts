import { CHANNELS } from "./channels";
import { subscriber } from "./redis";

subscriber.subscribe(CHANNELS.BLOCK, CHANNELS.TRANSACTION, (err, count) => {
  if (err) console.error(err);
  else console.log(`Subscribed to ${count} channel(s)`);
});

subscriber.on("message", (channel, message) => {
  if (channel === CHANNELS.BLOCK) {
    const block = JSON.parse(message);
    console.log("Received new block:", block);
  }
});
