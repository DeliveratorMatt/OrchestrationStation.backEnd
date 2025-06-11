import db from "#db/client";

export async function createInstrumentDetails({
    instrumentId, famousMusicians, famousMusiciansUrl, famousExcerpts, famousExcerptsUrl, scoreUrl}) {
  const { rows: [instrumentDetails] } = await db.query(
    `INSERT INTO instrument_details (instrument_id, famous_musicians, famous_musicians_url, famous_excerpts, famous_excerpts_url, score_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [instrumentId, famousMusicians, famousMusiciansUrl, famousExcerpts, famousExcerptsUrl, scoreUrl]
  );
  return instrumentDetails;
};

export async function getInstrumentDetailsById(instrumentId) {
  const { rows: [instrumentDetails] } = await db.query(
    `SELECT * FROM instrument_details WHERE instrument_id = $1`,
    [instrumentId]
  );
  return instrumentDetails;
}
export async function updateInstrumentDetails({
    instrumentId, famousMusicians, famousMusiciansUrl, famousExcerpts, famousExcerptsUrl, scoreUrl }) {
  const { rows: [instrumentDetails] } = await db.query(
    `UPDATE instrument_details
     SET famous_musicians = $2, famous_musicians_url = $3, famous_excerpts = $4, famous_excerpts_url = $5, score_url = $6
     WHERE instrument_id = $1
     RETURNING *`,
    [instrumentId, famousMusicians, famousMusiciansUrl, famousExcerpts, famousExcerptsUrl, scoreUrl]
  );
  return instrumentDetails;
}
export async function deleteInstrumentDetails(instrumentId) {
  const { rowCount } = await db.query(
    `DELETE FROM instrument_details WHERE instrument_id = $1`,
    [instrumentId]
  );
  return rowCount > 0; // Returns true if a row was deleted
}
export async function getAllInstrumentDetails() {
  const { rows } = await db.query(`SELECT * FROM instrument_details`);
  return rows;
}
