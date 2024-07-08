import express, { json } from "express";
import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import organisationRouter from "./routes/organisationRoutes.js";

const app = express();

app.use(morgan("tiny"));
app.use(json());

app.use("/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/organisations", organisationRouter);

export default app;
