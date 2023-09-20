const express = require("express");
const cors = require("cors");
//const cookieParser = require('cookie-parser')
//const express = require('express')

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser())

const userRouter = require("./routes/userRoutes");

app.use("/api", userRouter);

app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Ronaldo");
});
// let host = "10.50.1.27";
// let host = "192.168.1.102";
let host = "localhost";
app.listen(3000, host, () => {
  console.log("Server is running on port 3000");
});
