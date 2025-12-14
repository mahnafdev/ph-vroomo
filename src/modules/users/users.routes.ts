import { Router } from "express";
import usersController from "./users.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", auth("admin"), usersController.getAll);
router.put("/:userId", auth("admin", "customer"), usersController.updateOne);

const usersRoutes = router;

export default usersRoutes;
