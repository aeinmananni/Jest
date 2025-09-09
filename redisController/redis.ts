import Redis from "ioredis";

export const publisher: Redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

export const subscriber: Redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

publisher.on("connect", () => console.log("Publisher connected to Redis"));
subscriber.on("connect", () => console.log("Subscriber connected to Redis"));

// خطای اتصال
publisher.on("error", (err) => console.error("Publisher Redis error:", err));
subscriber.on("error", (err) => console.error("Subscriber Redis error:", err));
