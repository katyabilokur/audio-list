import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.error("Redis Client Error", err));

// Connect once and reuse
async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export { redis, connectRedis };
