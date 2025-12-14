import { Router } from "express";
import bookingsController from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingsController.createOne);
router.get("/", auth("admin", "customer"), bookingsController.getAll);
router.put("/:bookingId", auth("admin", "customer"), bookingsController.updateOne);

const bookingsRoutes = router;

export default bookingsRoutes;
