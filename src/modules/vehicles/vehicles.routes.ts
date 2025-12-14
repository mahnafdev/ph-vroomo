import { Router } from "express";
import vehiclesController from "./vehicles.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", vehiclesController.getAll);
router.post("/", auth("admin"), vehiclesController.createOne);

const vehiclesRoutes = router;

export default vehiclesRoutes;
