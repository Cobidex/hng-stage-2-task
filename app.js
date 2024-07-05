const express = require("express");
const sequelize = require("./config");
const morgan = require("morgan");
const authRouter = require("./routes/authRouter.js");
const userRouter = require("/routes/userRouter.js");
const organisationRouter = require("/routes/organisationRoutes.js");

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("api/organisations", organisationRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is listening on port", port);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION!!! * Shutting down ...");
  process.exit(1);
});
