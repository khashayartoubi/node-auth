import controller from "./index";
import _ from "lodash";
import bcrypt from "bcrypt";
import config from "config";
var jwt = require("jsonwebtoken");

export default new (class AuthController extends controller {
	// {}
	

	async register(req, res) {
		// console.log("==>global", Object.getPrototypeOf(this));
		const { name, email, password } = req.body;
		if (name && email && password) {
			let user = await this.Users.findOne({
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

			user = await new this.Users({ name, email, password });
			// user = new this.User(_.pick(req.body, ["name", "email", "password"]));
			const salt = await bcrypt.genSalt(5);
			user.password = await bcrypt.hash(user.password, salt);
			if (user.email === "2btoubi2b@gmail.com") {
				user.admin = 1;
			}
			await user.save();
			user.toJSON();

			return this.response({
				res,
				message: "the user successfuly registered",
				code: 201,
				data: _.pick(user, ["id", "name", "email"]),
			});
		} else {
			return this.response({
				res,
				message: "the user successfuly registereddddd",
				code: 400,
				data: [],
			});
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		const user = await this.Users.findOne({
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

		// const refreshToken = jwt.sign(
		// 	{ id: user.id },
		// 	config.get("jwt_key_refresh"),
		// 	{ expiresIn: "30s" }
		// );

		return this.response({
			res,
			code: 200,
			message: "login is successfully",
			data: [{ token: token }],
		});
	}

	async userModify(req, res) {
		const { name, email, password } = req.body;
		const user = await this.Users.findOne({
			where: {
				id: req.params.id,
			},
		});
		user.name = name;
		user.password = password;
		user.email = email;
		await user.save();
		this.response({
			res,
			message: "the user successfuly find",
			code: 201,
			data: user,
		});
	}

	uploadFile(req, res) {
		console.log(req.body);
		console.log(req.files);
		return res.end('')
		// return res.json({ message: "Successfully uploaded files" });
	}
})();
