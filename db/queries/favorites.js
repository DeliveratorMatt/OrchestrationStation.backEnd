import db from "#db/client";

// Get all favorite instruments for a user
export async function getFavoritesByUserId(userId) {
  const sql = ` SELECT instruments.*
     FROM favorites
     JOIN instruments ON favorites.instrument_id = instruments.id
    WHERE favorites.user_id = $1`;
  const { rows: favorites } = await db.query(sql, [userId]);
  return favorites;
}

export async function addFavoriteInstrument(userId, instrumentId) {
  const sql = `
    INSERT INTO favorites (user_id, instrument_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *;
  `;
  const { rows: [favorite] } = await db.query(sql, [userId, instrumentId]);
  return favorite;
}


// Remove an instrument from a user's favorites
export async function removeFavorite(userId, instrumentId) {
  const {
    rows: [removed],
  } = await db.query(
    `DELETE FROM favorites WHERE user_id = $1 AND instrument_id = $2 RETURNING *`,
    [userId, instrumentId]
  );
  return removed;
}

// Check if an instrument is favorited by a user
export async function isInstrumentFavorited(userId, instrumentId) {
  const {
    rows: [favorite],
  } = await db.query(
    `SELECT 1 FROM favorites WHERE user_id = $1 AND instrument_id = $2`,
    [userId, instrumentId]
  );
  return !!favorite;
}
