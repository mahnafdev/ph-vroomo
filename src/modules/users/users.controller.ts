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

const usersController = {
	getAll,
};

export default usersController;
