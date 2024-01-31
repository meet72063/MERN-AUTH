require("dotenv").config();
require("express-async-errors");

//middlewares
const cors = require("cors");

//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

//error handler
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");

//DB connection
const connectDB = require("./db/connection");
const express = require("express");

//our express app
const app = express();

//provide cross origin access
app.use(cors());

//parse json request body
app.use(express.json());

app.use(helmet());
app.use(xss());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB();
    console.log("DB connected!");
    app.listen(PORT, () =>
      console.log(`Server is listening on the PORT:${PORT}`)
    );
  } catch (error) {
    console.log("Error while Starting Application ", error);
  }
};

//start App
start();
