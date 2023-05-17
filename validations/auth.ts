const expressValidator = require("express-validator");
const check = expressValidator.check;
const { body, validationResult } = require("express-validator");

export default new (class {
	registerValidator() {
		const data = [
			check("name")
				.not()
				.isEmpty()
				.withMessage("name cant be empty")
				.isString()
				.withMessage("name must be string"),
			check("email")
				.not()
				.isEmpty()
				.withMessage("email cant be empty")
				.isEmail()
				.withMessage("email is invalid"),
			check("password")
				.not()
				.isEmpty()
				.withMessage("password cant be empty")
				.isString()
				.withMessage("password must be string"),
			(req, res, next) => {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(400).json({
						data: null,
						errors: errors.array(),
						message: "validation error",
					});
				}
				next();
			},
		];
		return data;
	}

	loginValidator() {
		const data = [
			check("email")
				.not()
				.isEmpty()
				.withMessage("email cant be empty")
				.isEmail()
				.withMessage("email is invalid"),
			check("password")
				.not()
				.isEmpty()
				.withMessage("password cant be empty")
				.isInt()
				.withMessage("password must be number"),
			(req, res, next) => {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(400).json({
						data: null,
						errors: errors.array(),
						message: "validation error",
					});
				}
				next();
			},
		];
		return data;
	}
})();
