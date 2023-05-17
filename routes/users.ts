import express from "express";
import usersController from "../controller/users";
const router = express.Router();

router.get("/", usersController.dashboard);

router.get("/profile", usersController.profile);

export default router;
