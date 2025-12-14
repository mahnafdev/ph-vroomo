import { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.login);

const authRoutes = router;

export default authRoutes;
