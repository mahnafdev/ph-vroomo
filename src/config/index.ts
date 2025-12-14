import { config as configDotEnv } from "dotenv";
import { join as joinPath } from "path";

//* Configure dotenv
configDotEnv({
	path: joinPath(process.cwd(), ".env"),
});

//* Accessible config data
const config: { dbConnection: string; jwtSecret: string } = {
	dbConnection: process.env.DB_CONNECTION!,
	jwtSecret: process.env.JWT_SECRET!,
};

export default config;
