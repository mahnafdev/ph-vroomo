import { Pool } from "pg";
import config from "../config/index";

//* DB Pool
const db = new Pool({
	connectionString: config.dbConnection,
});

//* Create Tables
const createTables = async () => {
	await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password TEXT NOT NULL CHECK (CHAR_LENGTH(password) > 5),
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(15) DEFAULT 'customer' CHECK (role IN ('admin', 'customer'))
        );
        `);
	await db.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(10) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(20) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price >= 0),
            availability_status VARCHAR(15) DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
        );
        `);
	await db.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id),
            vehicle_id INT REFERENCES vehicles(id),
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
            total_price INT NOT NULL CHECK (total_price >= 0),
            status VARCHAR(15) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned'))
        );
        `);
};

export { db, createTables };
