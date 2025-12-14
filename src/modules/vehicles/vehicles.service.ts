import { db } from "../../database";

const createVehicle = async (payload: Record<string, any>) => {
	// Destructure payload
	const { vehicle_name, type, registration_number, daily_rent_price, availability_status } =
		payload;
	// Insert vehicle into DB
	const result = await db.query(
		"INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status;",
		[vehicle_name, type, registration_number, daily_rent_price, availability_status],
	);
	// Return result
	return result.rows[0];
};

const fetchVehicles = async () => {
	// Fetch vehicles from DB
	const result = await db.query("SELECT * FROM vehicles;");
	// Return result
	return result.rows;
};

const fetchVehicleById = async (id: number) => {
	// Fetch vehicle from DB
	const result = await db.query("SELECT * FROM vehicles WHERE id = $1;", [id]);
	// Return result
	return result.rows[0];
};

const updateVehicle = async (vehicleId: number, payload: Record<string, any>) => {
	// Fields to update
	const fields = Object.keys(payload).map((k, i) => `${k} = $${i + 1}`);
	// Update vehicle in DB
	const result = await db.query(
		`UPDATE vehicles SET ${fields.join(", ")} WHERE id = $${
			fields.length + 1
		} RETURNING *;`,
		[...Object.values(payload), vehicleId],
	);
	// Return result
	return result.rows[0];
};

const deleteVehicle = async (id: number) => {
	await db.query("DELETE FROM vehicles WHERE id = $1", [id]);
};

const vehiclesService = {
	createVehicle,
	fetchVehicles,
	fetchVehicleById,
	updateVehicle,
	deleteVehicle,
};

export default vehiclesService;
