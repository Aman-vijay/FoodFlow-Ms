const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/User", proxy("http://localhost:5001"));
app.use("/Shopping", proxy("http://localhost:5003"));
app.use("/", proxy("http://localhost:5002")); // FoodItems

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});
