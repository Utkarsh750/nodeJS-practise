const express = require("express");
const { connectMongoDb } = require("./connection");

const { logReqres } = require("./middleware");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;
const fs = require("fs");

// MongoDb Connection
connectMongoDb(
  "mongodb+srv://utkarsh750:1234@cluster0.wkygvry.mongodb.net/?retryWrites=true&w=majority/practise"
).then(() => console.log("MongoDb connected"));

// Middleware Plugins
app.use(express.urlencoded({ extended: false }));
app.use(logReqres("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
