import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let db;

if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });
    console.log("MySQL connected successfully");
  } catch (err) {
    console.warn("Could not connect to MySQL", err.message);
    db = null;
  }
} else {
  console.log("MySQL env vars not set");
  db = null;
}

export { db };
