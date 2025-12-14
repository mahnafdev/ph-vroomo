import { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post("/signup", authController.signup);

const authRoutes = router;

export default authRoutes;
