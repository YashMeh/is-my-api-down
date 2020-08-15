const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/api/status", (req, res) => {
  res.send({ message: "All Okay" }).status(200);
});
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App running at port ${PORT}`);
});
