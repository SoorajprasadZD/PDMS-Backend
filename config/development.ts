const config = {
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT || "5001"),
    env: parseInt(process.env.NODE_ENV || "development"),
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
      rateLimitMaxRequests: process.env.COMMON_RATE_LIMIT_MAX_REQUESTS || 20,
      rateLimitWindowMs: process.env.COMMON_RATE_LIMIT_WINDOW_MS || 1000,
    },
  };

export default config;
