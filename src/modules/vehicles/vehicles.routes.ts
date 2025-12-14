import { Router } from "express";
import vehiclesController from "./vehicles.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/", vehiclesController.getAll);
router.get("/:vehicleId", vehiclesController.getOne);
router.post("/", auth("admin"), vehiclesController.createOne);
router.put("/:vehicleId", auth("admin"), vehiclesController.updateOne);

const vehiclesRoutes = router;

export default vehiclesRoutes;
