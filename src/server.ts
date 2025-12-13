import express, { Request, Response } from "express";
import { createTables } from "./config/db";

const app = express();
const port = 8080;

//* Global Middlewares
app.use(express.json());

//* Create DB Tables
createTables();

//* GET /
app.get("/", (req: Request, res: Response) => {
	// Send 200 response
	res.status(200).json({
		success: true,
		message: "Entered into Vroomo",
	});
});

//* Listen server
app.listen(port, () => {
	console.log(`> Server running on Port <${port}>`);
});
