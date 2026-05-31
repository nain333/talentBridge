import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/auth.validation.middleware.js";

const router = Router();

router.get("/login", authController.renderLogin);
router.post("/login",loginValidator,authController.postSignIn);

router.get("/register", authController.renderRegister);
router.post("/register", registerValidator,authController.postRegister);
router.post("/logout", authController.logout);

export default router;