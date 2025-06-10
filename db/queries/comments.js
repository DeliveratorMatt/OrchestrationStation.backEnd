import db from "#db/client";

// Get all comments for an instrument
export async function getCommentsByInstrumentId(instrumentId) {
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE instrument_id = $1 ORDER BY created_at DESC`,
    [instrumentId]
  );
  return rows;
}

// Get all comments by a user
export async function getCommentsByUserId(userId) {
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

// Add a comment to an instrument
export async function addComment({ userId, category, content, instrumentId }) {
  const { rows: [comment] } = await db.query(
    `INSERT INTO comments (user_id, category, content, instrument_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, category, content, instrumentId]
  );
  return comment;
}

// Delete a comment (by id and user)
export async function deleteComment(commentId, userId) {
  const { rows: [deleted] } = await db.query(
    `DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *`,
    [commentId, userId]
  );
  return deleted;
}
