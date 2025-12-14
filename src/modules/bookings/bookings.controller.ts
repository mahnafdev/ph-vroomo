import { Request, Response } from "express";
import bookingsService from "./bookings.service";

const createOne = async (req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const result = await bookingsService.createBooking(req.body);
		// Send 201 response
		return res.status(201).json({
			success: true,
			message: "Booking created successfully",
			data: result,
		});
	} catch (error: any) {
		// Send 500 response
		return res.status(500).json({
			success: false,
			message: error.message,
			error,
		});
	}
};

const bookingsController = {
	createOne,
};

export default bookingsController;
