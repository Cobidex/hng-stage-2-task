import { config } from "dotenv";
import sequelize from "./sync.js";
import app from "./app.js";

config({ path: "./.env" });

sequelize.authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is listening on port", port);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION!!! * Shutting down ...");
  process.exit(1);
});
