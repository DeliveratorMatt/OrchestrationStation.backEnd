import pg from "pg";
const options = { connectionString: process.env.DATABASE_URL };

// Need SSL for external database connection
if (process.env.NODE_ENV === "production") {
  options.ssl = { rejectUnauthorized: false };
}

const db = new pg.Client(options);

export default db;
// This code initializes a PostgreSQL client using
// the pg library and connects it to a database
// using the DATABASE_URL environment variable.
// It exports the client for use in other parts of the application.
