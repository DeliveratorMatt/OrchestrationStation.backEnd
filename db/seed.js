import db from "#db/client.js";
import bcrypt from "bcrypt";
import { createUser } from "#db/queries/users.js";
import { createInstrument } from "#db/queries/instruments.js";
import { createInstrumentDetails } from "#db/queries/instrumentdetails.js";

async function seed() {
  // Hash passwords using bcrypt
  const adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const userPasswordHash = await bcrypt.hash("userpassword", 10);

  // Create users
  const admin = await createUser("admin", adminPasswordHash, true, new Date(), process.env.ADMIN_EMAIL);
  const user = await createUser("user", userPasswordHash, false, new Date(), "user@example.com");

  // Create instruments
  const flute = await createInstrument({
    instrument_name: "Flute",
    family: "Woodwind",
    description: "A woodwind instrument...",
    range: "C4–C7",
    history: "The modern flute was developed in the 19th century."
  });

  // Create instrument details
  await createInstrumentDetails({
    instrument_id: flute.id,
    famous_musicians: "Jean-Pierre Rampal, James Galway",
    famous_musicians_url: "https://en.wikipedia.org/wiki/Jean-Pierre_Rampal,https://en.wikipedia.org/wiki/James_Galway",
    famous_excerpts_: "Debussy: Prélude à l'après-midi d'un faune",
    famous_excerpts_url: "https://www.youtube.com/watch?v=9_7loz-HWUM",
    score_url: "https://imslp.org/wiki/Pr%C3%A9lude_%C3%A0_l%27apr%C3%A8s-midi_d%27un_faune_(Debussy,_Claude)"
  });
}

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");