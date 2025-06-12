import db from "#db/client";
import bcrypt from "bcrypt";
import { addComment } from "#db/queries/comments";
import { createInstrument } from "#db/queries/instruments";
import { addFavorite } from "#db/queries/favorites";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Seed instruments and collect their IDs
  const instrumentIds = [];
  for (let i = 0; i < 10; i++) {
    const instrument = await createInstrument({
      instrument_name: `Trombone`,
      description: `A brass instrument...`,
      range: `F#3 to D6`,
      famous_musicians: `Miles Davis`,
      famous_excerpts: `Some cool piece`,
      score_links: `http://example.com/sheet.pdf`,
      history: `Used in orchestras since...`,
      image_url: `http://localhost:3000/public/images/trombone.jpg`,
    });
    instrumentIds.push(instrument.id);
  }
}
