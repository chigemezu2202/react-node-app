//Hack: Package Imports
import express from "express";

//Hack: Local Imports
import {
    resetPassword,
    forgotPassword,
    login,
    logout,
    signup,
    verifyEmail,
    checkAuth
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

//Hack: Express Router for Making different End point entry
const router = express.Router();

// TODO: Implement authentication routes here

//Hack: Router End Point for signup, login and logout
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

//Hack: Router End Point verification
router.post("/verify-email", verifyEmail)

//Hack: Router End Point Forget Password
router.post("/forgot-password", forgotPassword)

//Hack: Router End Point Reset  Password
router.post("/reset-password/:token", resetPassword)

//Hack: Router End Point for Check Auth
//Hack: make route to be protected
router.get("/check-auth", verifyToken, checkAuth)

export default router;