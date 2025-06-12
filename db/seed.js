import db from "#db/client.js";
import bcrypt from "bcrypt";



await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");