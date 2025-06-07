import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;
// This code initializes a PostgreSQL client using 
// the pg library and connects it to a database 
// using the DATABASE_URL environment variable.
// It exports the client for use in other parts of the application.