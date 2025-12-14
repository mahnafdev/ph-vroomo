import { db } from "../../database";

const createBooking = async (payload: Record<string, any>) => {
	// Destructure payload
	const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
	// Fetch Vehicle
	const vehicle = await db.query(`SELECT daily_rent_price FROM vehicles WHERE id = $1`, [
		vehicle_id,
	]);
	// Total Price calculation
	const daily_price: number = vehicle.rows[0].daily_rent_price;
	const number_of_days: number =
		(new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime()) /
		(1000 * 60 * 60 * 24);
	const total_price: number = daily_price * number_of_days;
	// Insert booking into DB
	const result = await db.query(
		`
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        VALUES ($1, $2, $3, $4, $5, 'active')
        RETURNING id, customer_id, vehicle_id, to_char(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, to_char(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status;
        `,
		[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price],
	);
	// Return result
	return result.rows[0];
};

const fetchBookings = async (currUser: { id: number; role: "admin" | "customer" }) => {
	let result;
	// Admin view
	if (currUser.role === "admin") {
		// Fetch all bookings
		result = await db.query("SELECT * FROM bookings;");
	}
	// Customer view
	else if (currUser.role === "customer") {
		// Fetch own bookings
		result = await db.query(
			`SELECT id, vehicle_id, rent_start_date, rent_end_date, total_price, status FROM bookings WHERE customer_id = $1;`,
			[currUser.id],
		);
	}
	// Return result
	return result?.rows;
};

const bookingsService = {
	createBooking,
	fetchBookings,
};

export default bookingsService;
