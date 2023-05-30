import express from "express";
import validator from "./../validations/auth";
import AuthController from "./../controller/auth";
import path from "path";
const router = express.Router();

router.post("/file", AuthController.uploadFile);

// * auth routes handler *******
router.put("/:id", AuthController.userModify);

router.post(
	"/register",
	validator.registerValidator(),
	AuthController.register
);
router.post("/login", validator.loginValidator(), AuthController.login);

export default router;
