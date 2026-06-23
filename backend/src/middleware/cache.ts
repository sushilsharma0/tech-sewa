import type { NextFunction, Request, Response } from "express";
import { redis } from "../config/redis.js";

export function cache(ttlSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = redis;
    if (!redisClient) return next();

    const key = `cache:${req.originalUrl}`;
    const cached = await redisClient.get(key);

    if (cached) {
      res.setHeader("X-Cache", "HIT");
      return res.json(JSON.parse(cached));
    }

    const json = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode < 400) {
        void redisClient.set(key, JSON.stringify(body), "EX", ttlSeconds);
      }
      return json(body);
    };

    next();
  };
}
