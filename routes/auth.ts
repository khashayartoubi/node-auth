import express from "express";
import validator from "./../validations/auth";
import AuthController from "./../controller/auth";
const router = express.Router();

// * auth routes handler *******
router.post(
	"/register",
	validator.registerValidator(),
	AuthController.register
);
// router.post("/login", validator.loginValidator(), AuthController.login);

export default router;
