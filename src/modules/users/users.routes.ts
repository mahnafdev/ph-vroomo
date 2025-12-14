import { Router } from "express";
import usersController from "./users.controller";

const router = Router();

router.get("/", usersController.getAll);

const usersRoutes = router;

export default usersRoutes;
