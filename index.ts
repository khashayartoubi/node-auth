import "express-async-errors";
import express from "express";
// * add nesseccary headers in req
import helmet from "helmet";
// ? moragn package is log managment
import morgan from "morgan";
import config from "config";
import db from "./models/index";
import router from "./routes";
const winston = require("winston");
const port = process.env.PORT || 3002;
const debug = require("debug")("app:main");
var cookieParser = require("cookie-parser");
const app = express();
var multer = require("multer");
var upload = multer();
var Recaptcha = require('express-recaptcha').RecaptchaV3
var options = { hl: 'fa' }
var recaptcha = new Recaptcha('6LdZFkEmAAAAAIxVcVx5ySM08tlSm5xzbe-1GA69', '6LdZFkEmAAAAALpcU2b_iCPhPiwIPShRjBvk-ioB', options)

// *

app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));
app.use(helmet());
app.use(cookieParser());

process.on("uncaughtException", (err) => {
	winston.error(err.message, err);
});
Promise.reject(new Error("promise error"));
process.on("unhandledRejection", (err) => {
	winston.error(err, err);
});


winston.add(new winston.transports.File({ filename: "logfile.log" }));
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
}

// Add headers before the routes are defined
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	// res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
	// res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	// res.sendStatus(204);
	next();
});

app.use("/api", router);

debug(app.use("/api", router));

// console.log(app.get("env"));
// debug("application name: ", config.get("name"));
// debug("application version: ", config.get("version"));
// debug("application sms ip: ", config.get("sms.ip"));
// debug("application sms id:: ", config.get("sms.id"));
// // debug('application sms key: ',config.get('sms.key'))

db.sequelize.sync({ alter: true }).then((res) => {
	app.listen(port, (): void => console.log(`app run on port ${port}!`));
});
module.exports = app;
