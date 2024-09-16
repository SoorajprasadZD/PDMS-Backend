import * as dotenv from "dotenv";
import * as path from "path";

try {
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.development") });
  } else if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });
  }
} catch (error) {
  console.log(error);
}

const config = {
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "5001"),
  environment: process.env.NODE_ENV || "development",
  cors: {
    whitelist: ["*"],
    origin: process.env.CORS_ORIGIN || "*",
  },
  argon: {
    argonSecretKey: process.env.ARGON_SECRET || "my_secret_key",
    characterSet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+><",
  },
  database: {
    uri: process.env.MONGO_DB_URI || "host",
  },
  common: {
    rateLimitMaxRequests: parseInt(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS || "20"),
    rateLimitWindowMs: parseInt(process.env.COMMON_RATE_LIMIT_WINDOW_MS || "1000"),
  },
  face: {
    privateKey: process.env.PRIVATE_KEY || ''
  }
};

export default config;
