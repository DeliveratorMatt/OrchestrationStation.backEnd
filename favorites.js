import db from "#db/client";

// Get all favorite instruments for a user
export async function getFavoritesByUserId(userId) {
  const { rows } = await db.query(
    `SELECT instrument_id FROM favorites WHERE user_id = $1`,
    [userId]
  );
  return rows.map(row => row.instrument_id);
}

// Add an instrument to a user's favorites
export async function addFavorite(userId, instrumentId) {
  const { rows: [favorite] } = await db.query(
    `INSERT INTO favorites (user_id, instrument_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [userId, instrumentId]
  );
  return favorite;
}

// Remove an instrument from a user's favorites
export async function removeFavorite(userId, instrumentId) {
  const { rows: [removed] } = await db.query(
    `DELETE FROM favorites WHERE user_id = $1 AND instrument_id = $2 RETURNING *`,
    [userId, instrumentId]
  );
  return removed;
}

// Check if an instrument is favorited by a user
export async function isInstrumentFavorited(userId, instrumentId) {
  const { rows: [favorite] } = await db.query(
    `SELECT 1 FROM favorites WHERE user_id = $1 AND instrument_id = $2`,
    [userId, instrumentId]
  );
  return !!favorite;
}
