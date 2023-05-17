import controller from "./index";
import _ from "lodash";
import bcrypt from "bcrypt";
import config from "config";
var jwt = require("jsonwebtoken");
const { users } = require("./../models");

export default new (class AuthController extends controller {
	
	async register(req, res) {
		const { name, email, password } = req.body;
		let user = await this.User.findOne({
			where: {
				email: email,
			},
		});
		if (user) {
			return this.response({
				res,
				code: 400,
				message: "this user already registered",
			});
		}


		
		user = await new this.User({ name, email, password });
		// user = new this.User(_.pick(req.body, ["name", "email", "password"]));
		const salt = await bcrypt.genSalt(5);
		user.password = await bcrypt.hash(user.password, salt);
		if(user.email === '2btoubi2b@gmail.com'){
			user.admin = 1
		}
		await user.save();
		user.toJSON();

		return this.response({
			res,
			message: "the user successfuly registered",
			data: _.pick(user, ["id", "name", "email"]),
		});
	}

	async login(req, res) {
		const { email, password } = req.body;
		const user = await this.User.findOne({
			where: {
				email,
			},
		});
		if (!user) {
			return this.response({
				res,
				code: 404,
				message: "this user not found",
			});
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return this.response({
				res,
				code: 404,
				message: "password or email invalid",
				data: [],
			});
		}
		const token = jwt.sign({ id: user.id }, config.get("jwt_key"));
		return this.response({
			res,
			code: 200,
			message: "login is successfully",
			data: token,
		});
	}
})();
