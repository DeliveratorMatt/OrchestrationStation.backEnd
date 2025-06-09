import db from "#db/client";
import bcrypt from "bcrypt";

// Creates a new user with a hashed password
export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
    INSERT INTO users
        (username, password)
    VALUES
        ($1, $2)
    RETURNING *
    `;
    const {
        rows: [user]
    } = await db.query(sql, [username, hashedPassword]);
    return user;
}

// Retrieves all users from the database
export async function getUsers() {
    const sql = `
    SELECT *
    FROM users
    `;
    const {
        rows: users
    } = await db.query(sql);
    return users;
}

// Retrieves a user by username and password, validating the password
export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

// Retrieves a user by their ID
export async function getUserById(id) {
    const sql = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const {
        rows: [user]
    } = await db.query(sql, [id]);
    return user;
}