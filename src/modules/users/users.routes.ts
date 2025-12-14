import { Router } from "express";
import usersController from "./users.controller";
import auth from "../../middlewares/auth";
import { roles } from "../auth/auth.constant";

const router = Router();

router.get("/", auth(roles.admin as "admin" | "customer"), usersController.getAll);

const usersRoutes = router;

export default usersRoutes;
