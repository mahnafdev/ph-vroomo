import { compare as comparePw, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../database/index";
import config from "../../config/index";

const signupUser = async (payload: Record<string, any>) => {
	// Destructure payload
	const { name, email, password, phone, role } = payload;
	// Hash password
	const hashedPassword = await hash(password, 10);
	// Insert user into DB
	const result = await db.query(
		"INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role;",
		[name, email, hashedPassword, phone, role],
	);
	// Return result
	return result.rows[0];
};

const loginUser = async (payload: Record<string, any>) => {
	// Destructure payload
	const { email, password } = payload;
	// Get user from DB
	const userQuery = await db.query("SELECT * FROM users WHERE email = $1", [email]);
	const user = await userQuery.rows[0];
	// If user doesn't exists
	if (userQuery.rowCount === 0) {
		throw new Error("No user found");
	}
	// Match passwords
	const samePassword = await comparePw(password, user.password);
	// If not same
	if (!samePassword) {
		throw new Error("Wrong password");
	}
	// JWT Payload
	const jwtPayload = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};
	// Generate access token
	const token = jwt.sign(jwtPayload, config.jwtSecret, {
		expiresIn: "7d",
	});
	// Return result
	return {
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
		},
	};
};

const authService = {
	signupUser,
	loginUser,
};

export default authService;
