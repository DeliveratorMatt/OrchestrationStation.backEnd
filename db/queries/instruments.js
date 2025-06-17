import db from "#db/client";

// Create a new instrument
export async function createInstrument({
  instrument_name,
  family,
  description,
  range,
  history,
}) {
  const {
    rows: [instrument],
  } = await db.query(
    `INSERT INTO instruments (instrument_name, family, description, range, history)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [instrument_name, family, description, range, history]
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

// Search instruments by family
export async function getInstrumentsByFamily(family) {
  const { rows } = await db.query(
    `SELECT * FROM instruments WHERE family = $1`,
    [family]
  );
  return rows;
}

// Create a new musician
export async function createMusician({
  instrument_id,
  famous_musicians,
  famous_musicians_url,
}) {
  const {
    rows: [musician],
  } = await db.query(
    `INSERT INTO instruments_musicians (instrument_id, famous_musicians, famous_musicians_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [instrument_id, famous_musicians, famous_musicians_url]
  );
  return musician;
}
// Get all musicians for an instrument
export async function getMusiciansByInstrumentId(instrument_id) {
  const { rows } = await db.query(
    `SELECT * FROM instruments_musicians WHERE instrument_id = $1`,
    [instrument_id]
  );
  return rows;
}
// Get all musicians
export async function getAllMusicians() {
  const { rows } = await db.query(`SELECT * FROM instruments_musicians`);
  return rows;
}

// Create a new piece
export async function createPiece({
  instrument_id,
  famous_excerpts,
  famous_excerpts_url,
  score_url,
}) {
  const {
    rows: [piece],
  } = await db.query(
    `INSERT INTO pieces (instrument_id, famous_excerpts, famous_excerpts_url, score_url)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [instrument_id, famous_excerpts, famous_excerpts_url, score_url]
  );
  return piece;
}
// Get all pieces for an instrument
export async function getPiecesByInstrumentId(instrument_id) {
  const { rows } = await db.query(
    `SELECT * FROM pieces WHERE instrument_id = $1`,
    [instrument_id]
  );
  return rows;
}
// Get all pieces
export async function getAllPieces() {
  const { rows } = await db.query(`SELECT * FROM pieces`);
  return rows;
}
// Get all instruments with their musicians and pieces
