import { Redis } from "ioredis";
import { env } from "./env.js";

export const redis = env.REDIS_ENABLED
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true
    })
  : null;

if (redis) {
  redis.on("error", (error: Error) => {
    console.error("Redis error", error.message || "Connection failed");
  });
}
