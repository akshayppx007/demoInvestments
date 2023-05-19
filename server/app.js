const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// import all routes
const user = require("./routes/userRoutes");
const investment = require("./routes/investMentRoutes");

app.use("/api/v1", user);
app.use("/api/v1", investment);

// error middleware
app.use(errorMiddleware);

module.exports = app;