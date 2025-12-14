import { db } from "../../database";

const fetchUsers = async () => {
	// Fetch users from DB
	const result = await db.query("SELECT id, name, email, phone, role FROM users;");
	// Return result
	return result.rows;
};

const updateUser = async (userId: number, payload: Record<string, any>) => {
	// Fields to update
	const fields = Object.keys(payload).map((k, i) => `${k} = $${i + 1}`);
	// Update user in DB
	const result = await db.query(
		`UPDATE users SET ${fields.join(", ")} WHERE id = $${
			fields.length + 1
		} RETURNING id, name, email, phone, role`,
		[...Object.values(payload), userId],
	);
	// Return result
	return result.rows[0];
};

const deleteUser = async (userId: number) => {
	await db.query("DELETE FROM users WHERE id = $1", [userId]);
};

const usersService = {
	fetchUsers,
	updateUser,
	deleteUser,
};

export default usersService;
