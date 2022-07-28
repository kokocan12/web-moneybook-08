import 'dotenv/config';
import mysql from 'mysql2/promise';

const DB_HOST = process.env.MYSQL_HOST;
const DB_USER = process.env.MYSQL_USER;
const DB_NAME = process.env.MYSQL_DB;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 30,
});
