import { db } from "../../database";

const fetchUsers = async () => {
	// Fetch users from DB
	const result = await db.query("SELECT id, name, email, phone, role FROM users;");
	// Return result
	return result.rows;
};

const usersService = {
	fetchUsers,
};

export default usersService;
