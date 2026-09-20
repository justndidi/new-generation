import express from "express";
import cors from "cors";

import subscribersRouter from "./routes/subscribersRouter.js";
import adminRouter from "./routes/adminRouter.js";
import artistRouter from "./routes/artistRouter.js";

const app = express();

app.use(cors());

app.use(express.json());

// Subscriber routes
app.use("/api", subscribersRouter);

// Admin routes
app.use("/api/admin", adminRouter);

// Artist routes
app.use("/api", artistRouter);

export default app;
