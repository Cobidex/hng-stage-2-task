const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const organisationRouter = require("./routes/organisationRoutes.js");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/organisations", organisationRouter);

module.exports = app;