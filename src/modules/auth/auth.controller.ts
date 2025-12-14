import { Request, Response } from "express";
import authServices from "./auth.service";

const signup = async (req: Request, res: Response) => {
	try {
		// Signup logic
		const result = await authServices.signupUser(req.body);
		// Send 201 response
		return res.status(201).json({
			success: true,
			message: "User registered successfully",
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

const login = async (req: Request, res: Response) => {
	try {
		// Login logic
		const result = await authServices.loginUser(req.body);
		// Send 200 response
		return res.status(200).json({
			success: true,
			message: "Login successful",
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

const authController = {
	signup,
	login,
};

export default authController;
