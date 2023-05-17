const winston = require("winston");

export default new (class {
	error(err, req, res, next) {
		winston.error(err.message, err);
		res.status(500).json({
			message: "server error",
			status: 500,
		});
		next();
	}
})();
