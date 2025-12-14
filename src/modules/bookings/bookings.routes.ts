import { Router } from "express";
import bookingsController from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingsController.createOne);

const bookingsRoutes = router;

export default bookingsRoutes;
