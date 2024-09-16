import { MongoDbConnection } from "./database/Connection";
import { app, logger } from "./server";
import config from 'config';

const host = config.get<string>('host');
const port = config.get<number>('port');
const environment = config.get<string>('environment');

MongoDbConnection.connect()
  .then(() => {
    const server = app.listen(port, () => {
      logger.info(`Connected to Database`);
      logger.info(
        `Server (${environment}) running on port http://${host}:${port}`
      );
    });

    const onCloseSignal = () => {
      logger.info("sigint received, shutting down");
      server.close(() => {
        logger.info("server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  })
  .catch((e) => {
    logger.error(e, "Failed to connect to database");
  });
