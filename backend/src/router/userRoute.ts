import express from "express";
import { forgetPassword, login, logout, register, verify } from "../controller/userController.js";
import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";


const router=express.Router();

router.route("/register").post(upload.single("avatar"),register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/forgetpassword").post(forgetPassword)
router.route("/verify").post(isAuthenticated,verify)

export default router