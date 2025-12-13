import express, { Request, Response } from "express";
import { createTables, db } from "./config/db";
import { hashSync } from "bcryptjs";

const app = express();
const port = 8080;

//* Global Middlewares
app.use(express.json());

//* Create DB Tables
createTables();

//* API Base
const apiBase = "/api/v1";

//* GET /
app.get("/", (_req: Request, res: Response) => {
	// Send 200 response
	res.status(200).json({
		success: true,
		message: "Entered into Vroomo",
	});
});

//* POST /auth/signup
app.post(`${apiBase}/auth/signup`, async (req: Request, res: Response) => {
	try {
		// Destructure body
		const { name, email, password, phone, role } = req.body;
		// Hash password
		const hashedPassword = await hashSync(password, 10);
		// Insert into DB
		const result = await db.query(
			"INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role;",
			[name, email, hashedPassword, phone, role],
		);
		// Send 201 response
		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: result.rows[0],
		});
	} catch (error: any) {
		// Send 500 response
		res.status(500).json({
			success: false,
			message: error.message,
			error,
		});
	}
});

//* Listen server
app.listen(port, () => {
	console.log(`> Server running on Port <${port}>`);
});
