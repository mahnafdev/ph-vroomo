import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { db } from "../database";

const auth = (...roles: ("admin" | "customer")[]) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		// Get authorization token
		const token = req.headers.authorization?.split(" ")[1];
		// If no token
		if (!token) throw new Error("User not authorized");
		// Decode token to obtain payload
		const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
		// Get user
		const user = await db.query("SELECT * FROM users WHERE email = $1", [decoded.email]);
		// If invalid token
		if (user.rowCount === 0) throw new Error("Invalid token");
		// Update user
		req.user = decoded;
		// If action forbidden
		if (roles.length && !roles.includes(decoded.role))
			throw new Error("User don't have this permission");
		next();
	};
};

export default auth;
