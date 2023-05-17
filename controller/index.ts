const { users } = require("./../models");
// import autoBind from "auto-bind";
import autoBind from "./autoBind";
const { validationResult } = require("express-validator");


export default class controller{
	// {}
	public User;
	constructor() {
		this.User = users;
		autoBind(this)
	}

	validationBody(req, res) {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			const errors = result.array();
			const message = errors.map((err) => err.msg);
			res.status(422).json({ errors: message });
			return false;
		}
		return true;
	}
	validate(req, res, next) {
		if (!this.validationBody(req, res)) {
			return;
		}
		next();
	}
	response({ res, message, code = 200, data = [] }) {
		res.status(code).json({
			data,
			message,
			status: code,
		});
	}
}
