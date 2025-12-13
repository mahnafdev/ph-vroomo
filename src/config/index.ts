import { config as configDotEnv } from "dotenv";
import { join as joinPath } from "path";

//* Configure dotenv
configDotEnv({
	path: joinPath(process.cwd(), ".env"),
});

//* Accessible config data
const config: { dbConnection: string } = {
	dbConnection: process.env.DB_CONNECTION!,
};

export default config;
