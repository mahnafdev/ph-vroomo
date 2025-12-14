import { Request, Response } from "express";
import vehiclesService from "./vehicles.service";

const createOne = async (req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const result = await vehiclesService.createVehicle(req.body);
		// Send 201 response
		return res.status(201).json({
			success: true,
			message: "Vehicle created successfully",
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

const vehiclesController = {
	createOne,
};

export default vehiclesController;
