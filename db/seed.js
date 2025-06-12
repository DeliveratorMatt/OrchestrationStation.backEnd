import db from "#db/client.js";
import bcrypt from "bcrypt";
import { createUser } from "#db/queries/users.js";
import { addComment } from "#db/queries/comments.js";
import {
  createInstrument,
  createMusician,
  createPiece,
} from "#db/queries/instruments.js";
import { addFavorite } from "#db/queries/favorites.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const INSTRUMENTS_SEED = [
    {
      family: "Strings",
      instrument_name: "Violin",
      description:
        "Soprano of the string family, both agile and lyrical, equally capable of producing heartbreaking elegies and joyful reels.",
      range: "G3-A7",
      history:
        "https://www.samsonhistorical.com/blogs/reliving-history/the-violin?srsltid=AfmBOoqEFBNTc8lDQ81d2PPSn_glMti8ggO7H-eOHU2d3wFd1JRjhv-w",
    },
    {
      family: "Winds",
      instrument_name: "Bassoon",
      description:
        "The baritone of the winds, the bassoon has a full-bodied sound, though it can be either jolly or threatening in its lower registers.",
      range: "Bb1-C5",
      history:
        "https://www.theinstrumentplace.com/history-of-the-bassoon?srsltid=AfmBOor0VB1wU_XhNzF72nVOFlvPqoWEPpf2ckN81BHMEskEE7qk4eEk",
    },
    {
      family: "Brass",
      instrument_name: "Trombone (Tenor)",
      description:
        "A middle-range instrument of the brass family, equally capable of taking the melodic lead or of providing harmonic support to higher-pitched instruments.",
      range: "E2-Bb4",
      history:
        "https://www.theinstrumentplace.com/history-of-the-trombone?srsltid=AfmBOopkjZ39uZTtRW9qM49X2xT6QhVIAAJCdFEI2K5GODnXfhcPyyfk",
    },
  ];

  for (const instrument of INSTRUMENTS_SEED) {
    await createInstrument(instrument);
  }

  const USERS_SEED = [
    {
      username: "Moomoo",
      password: "imacow",
      email: "moomoo@notapig.com",
    },
    {
      username: "violaluvr",
      password: "CGDA",
      email: "violaluvr@aol.com",
    },
    {
      username: "howardthesphere",
      password: "zandoszoo",
      email: "friendly@sphere.com",
    },
  ];

  for (const user of USERS_SEED) {
    await createUser(user);
  }

  const INSTRUMENTS_MUSICIANS_SEED = [
    {
      instrument_id: 1,
      famous_musicians: "Fritz Kreisler",
      famous_musicians_url: "https://en.wikipedia.org/wiki/Fritz_Kreisler",
    },
    {
      instrument_id: 1,
      famous_musicians: "Leila Josefowicz",
      famous_musicians_url: "https://en.wikipedia.org/wiki/Leila_Josefowicz",
    },
    {
      instrument_id: 2,
      famous_musicians: "Carl Almenräder",
      famous_musicians_url:
        "https://en.wikipedia.org/wiki/Carl_Almenr%C3%A4der",
    },
    {
      instrument_id: 2,
      famous_musicians: "Judith LeClair",
      famous_musicians_url: "https://www.bossbassoon.com/judithleclair",
    },
    {
      instrument_id: 3,
      famous_musicians: "Dorothy Ziegler",
      famous_musicians_url: "https://en.wikipedia.org/wiki/Dorothy_Ziegler",
    },
    {
      instrument_id: 3,
      famous_musicians: "Joseph Alessi",
      famous_musicians_url:
        "https://www.nyphil.org/about-us/artists/joseph-alessi/",
    },
  ];

  for (const musician of INSTRUMENTS_MUSICIANS_SEED) {
    await createMusician(musician);
  }

  const PIECES_SEED = [
    {
      instrument_id: 1,
      famous_excerpts: "Ravel - Tzigane",
      famous_excerpts_url: "https://www.youtube.com/watch?v=tQjh9Z71RJ4",
      score_url: "https://imslp.org/wiki/Tzigane%2C_M.76_(Ravel%2C_Maurice)",
    },

    {
      instrument_id: 2,
      famous_excerpts: "Stravinsky - The Rite of Spring (first minute)",
      famous_excerpts_url: "https://www.youtube.com/watch?v=-AwJVunm42w",
      score_url:
        "https://imslp.org/wiki/The_Rite_of_Spring,_K015_(Stravinsky,_Igor)",
    },

    {
      instrument_id: 3,
      famous_excerpts: "Rimsky-Korsakov - Russian Easter Overture",
      famous_excerpts_url: "https://www.youtube.com/watch?v=c33jsKCXDGk",
      score_url:
        "https://imslp.org/wiki/Russian_Easter_Festival,_Op.36_(Rimsky-Korsakov,_Nikolay)",
    },
  ];

  for (const piece of PIECES_SEED) {
    await createPiece(piece);
  };

  const COMMENTS_SEED = [
    {
      user_id: 1,
      category: "General",
      content: "Womp womp womp womp!",
      instrument_id: 3,
    },
    {
      user_id: 1,
      category: "General",
      content:
        "I apologize for my previous comment. I know trombones can make other sounds.",
      instrument_id: 3,
    },
    {
      user_id: 1,
      category: "Suggestion",
      content: "Add some Mahler!",
      instrument_id: 3,
    },
    {
      user_id: 2,
      category: "Suggestion",
      content: "You should add the Mozart Violin Sonata #12!",
      instrument_id: 1,
    },
    {
      user_id: 3,
      category: "Suggestion",
      content: "Lorem ipsum.",
      instrument_id: 3,
    },
    {
      user_id: 2,
      category: "General",
      content: "Great example piece(s)!",
      instrument_id: 2,
    },
    {
      user_id: 3,
      category: "General",
      content: "Eh. These pieces could be better.",
      instrument_id: 2,
    },
  ];

  for (const comment of COMMENTS_SEED) {
    await addComment(comment);
  }

  const FAVORITES_SEED = [
    {
      user_id: "1",
      instrument_id: "1",
    },
    {
      user_id: "1",
      instrument_id: "3",
    },
    {
      user_id: "2",
      instrument_id: "1",
    },
  ];

  for (const favorite of FAVORITES_SEED) {
    await addFavorite(favorite);
  }
}
