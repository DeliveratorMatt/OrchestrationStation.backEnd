import db from "#db/client";

// Add feedback
export async function postFeedback({ user_id, content }) {
  const {
    rows: [feedback],
  } = await db.query(
    `INSERT INTO feedback (user_id, content)
       VALUES ($1, $2)
       RETURNING *`,
    [user_id, content]
  );
  return feedback;
}
