import express from "express";
import { createTables } from "./config/db";

const app = express();
const port = 8080;

//* Global Middlewares
app.use(express.json());

//* Create DB Tables
createTables();

//* Listen server
app.listen(port, () => {
	console.log(`> Server running on Port <${port}>`);
});
