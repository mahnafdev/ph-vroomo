import { db } from "../../database/index";

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
	// Update vehicle availability
	await db.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [
		vehicle_id,
	]);
	// Return result
	return result.rows[0];
};

const fetchBookings = async (currUser: { id: number; role: "admin" | "customer" }) => {
	let result;
	// Admin view
	if (currUser.role === "admin") {
		// Fetch all bookings
		result = await db.query(
			"SELECT id, customer_id, vehicle_id, to_char(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, to_char(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status FROM bookings;",
		);
	}
	// Customer view
	else if (currUser.role === "customer") {
		// Fetch own bookings
		result = await db.query(
			`SELECT id, vehicle_id, to_char(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, to_char(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status FROM bookings WHERE customer_id = $1;`,
			[currUser.id],
		);
	}
	// Return result
	return result?.rows;
};

const updateBooking = async (
	bookingId: number,
	status: "active" | "cancelled" | "returned",
	user: { id: number; role: "admin" | "customer" },
) => {
	// Fetch booking
	const booking = (await db.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]))
		.rows[0];
	// Get dates
	const today = new Date();
	const rentEndDate = new Date(booking.rent_end_date);
	// If rent ended and booking still active
	if (rentEndDate < today && booking.status === "active") {
		try {
			// Update booking status
			await db.query(`UPDATE bookings SET status = 'returned' WHERE id = $1`, [
				bookingId,
			]);
			// Update vehicle availability
			await db.query(
				`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
				[booking.vehicle_id],
			);
		} catch (error) {
			throw error;
		}
		// Return result
		return {
			message: "Booking marked as returned. Vehicle is now available.",
			data: {
				...booking,
				status: "returned",
				vehicle: {
					availability_status: "available",
				},
			},
		};
	}
	// If customer
	if (user.role === "customer") {
		if (booking.customer_id !== user.id) throw new Error("You can't update this booking");
		if (status !== "cancelled") throw new Error("You can only cancel this booking");
	}
	// If canceled booking
	if (status === "cancelled") {
		// Cancel booking
		await db.query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1`, [bookingId]);
		// Make vehicle available
		await db.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [
			booking.vehicle_id,
		]);
		// Return result
		return {
			message: "Booking cancelled successfully",
			data: { ...booking, status: "cancelled" },
		};
	}
	// If booking ended
	if (status === "returned") {
		// Return booking
		await db.query(`UPDATE bookings SET status = 'returned' WHERE id = $1`, [bookingId]);
		// Make vehicle available
		await db.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [
			booking.vehicle_id,
		]);
		// Return result
		return {
			message: "Booking marked as returned. Vehicle is now available.",
			data: {
				...booking,
				status: "returned",
				vehicle: {
					availability_status: "available",
				},
			},
		};
	}
};

const bookingsService = {
	createBooking,
	fetchBookings,
	updateBooking,
};

export default bookingsService;
