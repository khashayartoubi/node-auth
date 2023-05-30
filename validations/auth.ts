import { checkExact, checkSchema, matchedData, oneOf } from "express-validator";

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
			// checkExact([body('email').isEmail()]
			// 			,{ message: 'Only email are allowed',locations: ['body']}
			// ),
			// async (req, res,next) => {
			// 	// const result = await checkExact([]
			// 	// ,{ message: 'Only email are allowed',locations: ['body']}
			// 	// ).run(req);
			// 	// if (result.isEmpty()) {
			// 	//   console.log('No unknown fields in the request');
			// 	// }
				
			// 	next()
			// },
			// check("password")
			// 	.not()
			// 	// .isEmpty()
			// 	.withMessage("password cant be empty"),
			// async (req, res, next) => {
			// 	if(body().isJSON()) {
					
			// 	}
			// 	next()
			
			// 	// Check the validation errors, and update the user's settings.
			//   },
			// checkSchema({
				
			// 	password: {
			// 	  isLength: {
			// 		options: { min: 8 },
			// 		errorMessage: 'Password should be at least 8 chars',
			// 	  },
				// },
			//   }),
			// checkExact([], { message: 'Only email and password are allowed' }),
			oneOf([body('email').isEmail(), body('password').isEmpty()], {
				message: 'At least one valid contact method must be provided',
			  }),
			async (req, res, next) => {
				// console.log(req.body);
				// const result = await checkExact().run(req);
				// if (result.isEmpty()) {
				// 	console.log('No unknown fields in the request');
				// }
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

	modify() {
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
})();
