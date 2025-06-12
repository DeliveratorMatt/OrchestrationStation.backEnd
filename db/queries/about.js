import db from "#db/client";

export async function submitFeedback({ userId, content }) {
  try {
    const result = await db.query(
      `INSERT INTO feedback (user_id, content) VALUES ($1, $2) RETURNING *`,
      [userId, feedback]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw new Error("Could not submit feedback");
  }
}