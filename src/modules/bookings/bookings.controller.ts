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

const getAll = async (req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const bookings = await bookingsService.fetchBookings({
			id: req.user?.id,
			role: req.user?.role,
		});
		// Send 201 response
		return res.status(201).json({
			success: true,
			message:
				req.user?.role === "admin"
					? "Bookings retrieved successfully"
					: "Your bookings retrieved successfully",
			data: bookings,
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

const updateOne = async (req: Request, res: Response) => {
	try {
		// Booking Id
		const { bookingId } = req.params;
		// New status
		const { status } = req.body;
		// Nuts and bolts
		const result = await bookingsService.updateBooking(Number(bookingId), status, {
			id: req.user!.id,
			role: req.user!.role,
		});
		// Send 200 response
		res.status(200).json({
			success: true,
			message: result?.message,
			data: result?.data,
		});
	} catch (error: any) {
		// Send 500 response
		res.status(500).json({
			success: true,
			message: error.message,
			error,
		});
	}
};

const bookingsController = {
	createOne,
	getAll,
	updateOne,
};

export default bookingsController;
