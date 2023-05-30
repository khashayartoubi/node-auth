import express from "express";
const router = express.Router();
import usersRouter from "./users";
import authRouter from "./auth";
import authMiddalware from "./../middalware/auth";
import errorHandler from './../middalware/error';
// * routers handler
router.use("/auth", authRouter);
router.use(
	"/users",
	authMiddalware.isLoggedIn,
	authMiddalware.isAdmin,
	usersRouter
);

router.use(errorHandler.error);

export default router;
