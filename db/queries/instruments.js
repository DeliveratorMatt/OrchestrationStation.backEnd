import db from "#db/client";

// Create a new instrument
export async function createInstrument({
  instrument_name,
  description,
  range,
  famous_musicians,
  famous_excerpts,
  score_links,
  history,
  image_url,
}) {
  const {
    rows: [instrument],
  } = await db.query(
    `INSERT INTO instruments (
      instrument_name, description, range, famous_musicians,
      famous_excerpts, score_links, history, image_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      instrument_name,
      description,
      range,
      famous_musicians,
      famous_excerpts,
      score_links,
      history,
      image_url,
    ]
  );
  return instrument;
}

// Get all instruments
export async function getAllInstruments() {
  const { rows } = await db.query(`SELECT * FROM instruments`);
  return rows;
}

// Get instrument by ID
export async function getInstrumentById(id) {
  const {
    rows: [instrument],
  } = await db.query(`SELECT * FROM instruments WHERE id = $1`, [id]);
  return instrument;
}
