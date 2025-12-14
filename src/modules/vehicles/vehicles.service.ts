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

const vehiclesService = {
	createVehicle,
	fetchVehicles,
};

export default vehiclesService;
