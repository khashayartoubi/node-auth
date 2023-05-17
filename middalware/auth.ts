import config from "config";
const { users } = require("./../models");
var jwt = require("jsonwebtoken");
export default new (class authMiddalware {
	async isLoggedIn(req, res, next) {
		const token = req.header("x-auth-token");
		if (!token) return res.status(401).json({ message: "access denied" });
		try {
			const decoded = jwt.verify(token, config.get("jwt_key"));
			console.log("=>>>>>", decoded);
			const user = await users.findOne({
				where: {
					id: decoded.id,
				},
				attributes: ["id", "name", "email", "createdAt", "updatedAt"],
			});
			console.log("=>>>>>", user);
			req.user = user.toJSON();
			res.status(200).json({
				message: "user access",
				data: req.user,
				status: 200,
			});
			next();
		} catch (err) {
			return res.status(400).json({
				message: "invalid token",
			});
		}
	}
	isAdmin(req, res, next) {
		if (req.admin != 2)
			return res.status(403).json({
				message: "access denied",
				status: 403,
				data: [],
			});
		next();
	}
	
})();
