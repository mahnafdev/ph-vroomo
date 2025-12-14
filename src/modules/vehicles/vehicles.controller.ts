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

const getAll = async (_req: Request, res: Response) => {
	try {
		// Nuts and bolts
		const vehicles = await vehiclesService.fetchVehicles();
		// Send 200 response
		return res.status(200).json({
			success: true,
			message: "Vehicles retrieved successfully",
			data: vehicles,
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

const getOne = async (req: Request, res: Response) => {
	try {
		// Vehicle Id
		const { vehicleId } = req.params;
		// Nuts and bolts
		const vehicle = await vehiclesService.fetchVehicleById(Number(vehicleId));
		// Send 200 response
		return res.status(200).json({
			success: true,
			message: "Vehicle retrieved successfully",
			data: vehicle,
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
		// Vehicle Id
		const { vehicleId } = req.params;
		// Nuts and bolts
		const updatedVehicle = await vehiclesService.updateVehicle(Number(vehicleId), req.body);
		// Send 200 response
		res.status(200).json({
			success: true,
			message: "Vehicle updated successfully",
			data: updatedVehicle,
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

const deleteOne = async (req: Request, res: Response) => {
	try {
		// Vehicle Id
		const { vehicleId } = req.params;
		// Nuts and bolts
		await vehiclesService.deleteVehicle(Number(vehicleId));
		// Send 200 response
		res.status(200).json({
			success: true,
			message: "Vehicle deleted successfully",
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
	getAll,
	getOne,
	updateOne,
	deleteOne,
};

export default vehiclesController;
