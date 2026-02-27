const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";
const NODE_ENV = process.env.NODE_ENV || "development";

let dbReady = false;

mongoose
  .connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    dbReady = true;
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    dbReady = false;
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
);

app.get("/", (request, response) => {
  response.json({
    message: "Express and Mongo Server is running!!",
  });
});

app.get("/health", (request, response) => {
  response.json({
    status: "OK",
    env: NODE_ENV,
  });
});

app.get("/ready", (request, response) => {
  if (!dbReady) {
    return response.status(503).json({
      status: "NOT_READY",
      db: "DISCONNECTED",
    });
  }
  response.status(200).json({
    status: "READY",
    db: "CONNECTED",
  });
});
