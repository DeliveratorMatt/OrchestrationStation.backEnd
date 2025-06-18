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
export async function addComment({
  user_id,
  category,
  content,
  instrument_id,
}) {
  const {
    rows: [comment],
  } = await db.query(
    `INSERT INTO comments (user_id, category, content, instrument_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, category, content, instrument_id]
  );
  return comment;
}

// Delete a comment (by id and user)
export async function deleteComment(commentId, userId) {
  const {
    rows: [deleted],
  } = await db.query(
    `DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *`,
    [commentId, userId]
  );
  return deleted;
}

export async function editComment({
  user_id,
  category,
  content,
  instrument_id,
}) {
  /* const {
    rows: [entry],
  } = await db.query(
    `UPDATE comments
     SET user_id = $1,
         category = $2,
         content = $3,
         instrument_id = $4
    WHERE 
     RETURNING *`,
    [category, content]
  );
  return entry; */
}
