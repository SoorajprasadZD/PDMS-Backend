import type { Request } from "express";
import { rateLimit } from "express-rate-limit";
import config from "config";

const rateLimitMaxRequests = config.get<number>("common.rateLimitMaxRequests");
const rateLimitWindowMs = config.get<number>("common.rateLimitWindowMs");

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: rateLimitMaxRequests,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 15 * 60 * rateLimitWindowMs,
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
