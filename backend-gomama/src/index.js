const path = require("path");
const express = require("express");
const router = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(3000, () => console.log('server is running on port 3000'));
