import { pool } from '../db.js';

export async function dbConnectionMiddleware(req, res, next) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  res.locals.connection = connection;
  next();
}
