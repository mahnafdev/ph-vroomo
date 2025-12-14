import { Request, Response } from "express";
import usersService from "./users.service";

const getAll = async (_req: Request, res: Response) => {
	try {
		// The nuts and bolts
		const users = await usersService.fetchUsers();
		// Send 200 response
		return res.status(200).json({
			success: true,
			message: "Users retrieved successfully",
			data: users,
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
		// User Id
		const { userId } = req.params;
		// Current user
		const currentUser = req.user!;
		// If customer but same user
		if (currentUser.role !== "admin" && currentUser.id !== Number(userId)) {
			// Send 403 response
			res.status(403).json({
				success: false,
				message: "You are forbidden to update this user",
			});
		}
		// Nuts and bolts
		const updatedUser = await usersService.updateUser(Number(userId), req.body);
		// Send 200 response
		res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: updatedUser,
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

const usersController = {
	getAll,
	updateOne,
};

export default usersController;
