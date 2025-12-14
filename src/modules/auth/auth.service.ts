import { hashSync } from "bcryptjs";
import { db } from "../../database";

const signupUser = async (payload: Record<string, any>) => {
	// Destructure payload
	const { name, email, password, phone, role } = payload;
	// Hash password
	const hashedPassword = await hashSync(password);
	// Insert user into DB
	const result = await db.query(
		"INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role;",
		[name, email, hashedPassword, phone, role],
	);
	// Return result
	return result.rows[0];
};

const authServices = {
	signupUser,
};

export default authServices;
