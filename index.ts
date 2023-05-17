import "express-async-errors";
import express from "express";
import helmet from "helmet";
// ? moragn package is log managment
import morgan from "morgan";
import config from "config";
import usersRoute from "./routes/users";
import db from "./models/index";
import router from "./routes";
const winston = require("winston");
const app = express();
const port = process.env.PORT || 3001;
const debug = require("debug")("app:main");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

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

app.use("/api", router);

debug(app.get("env"));
debug("application name: ", config.get("name"));
debug("application version: ", config.get("version"));
debug("application sms ip: ", config.get("sms.ip"));
debug("application sms id:: ", config.get("sms.id"));
// debug('application sms key: ',config.get('sms.key'))

db.sequelize.sync({ alter: true }).then((res) => {
	app.listen(port, (): void => console.log(`app run on port ${port}!`));
});
