import db from "#db/client";

// Create a new instrument
export async function createInstrument({ 
  name, family, description, imageUrl, range, 
  famousMusicians, famousExcerpts, 
  scoreUrl,  history }) {
  const { rows: [instrument] } = await db.query(
    `INSERT INTO instruments (name, family, description, imageUrl, range, 
    famousMusicians, famousExcerpts, 
    scoreUrl,  history )
     VALUES ($1, $2, $3, $4, $5, 
     $6, $7, $8, $9)
     RETURNING *`,
    [name, family, description, imageUrl, range, 
  famousMusicians, famousExcerpts, 
  scoreUrl,  history ]
  );
  return instrument;
};

// Get all instruments
export async function getAllInstruments() {
  const { rows } = await db.query(`SELECT * FROM instruments`);
  return rows;
};

// Get instrument by ID
export async function getInstrumentById(id) {
  const { rows: [instrument] } = await db.query(
    `SELECT * FROM instruments WHERE id = $1`,
    [id]
  );
  return instrument;
};

// Search instruments by family
export async function getInstrumentsByFamily(family) {
  const { rows } = await db.query(
    `SELECT * FROM instruments WHERE family = $1`,
    [family]
  );
  return rows;
}
