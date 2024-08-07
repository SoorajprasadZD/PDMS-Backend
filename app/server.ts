import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import config from "config";
import errorHandler from "./common/middleware/errorHandler";
import requestLogger from "./common/middleware/requestLogger";
import rateLimiter from "./common/middleware/rateLimiter";
import healthCheckRouter from "./routers/healthCheckRouter";
import doctorRouter from "./routers/doctorRoutes";
import insuranceRouter from "./routers/insuranceRoutes";
import patientRouter from "./routers/patientRoutes";
import adminRouter from "./routers/adminRoutes";
import commonRouter from "./routers/commonRoutes";

const corsOrigin = config.get<string>("cors.origin");
const logger = pino({ name: "server start" });
const app: Express = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

app.use("/health-check", healthCheckRouter);
app.use("/doctors", doctorRouter);
app.use("/insurances", insuranceRouter);
app.use("/patients", patientRouter);
app.use("/admin", adminRouter);
app.use("/common", commonRouter);

app.use(errorHandler());

export { app, logger };
