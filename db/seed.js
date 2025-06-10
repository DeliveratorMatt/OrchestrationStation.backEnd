import db from "#db/client.js";
import bcrypt from "bcrypt";
import { createUser } from "#db/queries/users.js";
import { addComment } from "#db/queries/comments.js";
import { createInstrument } from "#db/queries/instruments.js";
import { addFavorite } from "#db/queries/favorites.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
    // Seed instruments and collect their IDs
    const instrumentIds = [];
    for (let i = 0; i < 10; i++) {
        const instrument = await createInstrument({
            name: `Instrument ${i + 1}`,
            family: `Family ${i % 3 + 1}`,
            description: `Description for Instrument ${i + 1}`,
            imageUrl: `http://example.com/image${i + 1}.jpg`,
            range: `Range for Instrument ${i + 1}`,
            famousMusicians: `Famous Musicians for Instrument ${i + 1}`,
            famousExcerpts: `Famous Excerpts for Instrument ${i + 1}`,
            scoreUrl: `http://example.com/score${i + 1}.pdf`,
            history: `History of Instrument ${i + 1}`
        });
        instrumentIds.push(instrument.id);
    }
