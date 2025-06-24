import express from "express";
const router = express.Router();
export default router;

import {
  getBiblioEntries,
  getBiblioEntryById,
  createBiblioEntry,
  deleteBiblioEntry,
} from "#db/queries/biblio";

import requireAdmin from "#middleware/requireAdmin";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router
  .route("/")
  .get(async (req, res) => {
    let sources = await getBiblioEntries();
    res.status(200).send(sources);
  })
  .post(
    requireUser,
    requireAdmin,
    requireBody(["title", "category", "url"]),
    async (req, res) => {
      const { title, category, url, author, publication_year } = req.body;
      const newSource = await createBiblioEntry({
        title,
        category,
        url,
        author,
        publication_year,
      });
      res.send(newSource);
    }
  );

router.param("id", async (req, res, next, id) => {
  const source = await getBiblioEntryById(id);
  if (!source) return res.status(404).send("Source not found.");
  req.source = source;
  next();
});

router.route("/:id").delete(requireUser, requireAdmin, async (req, res) => {
  const id = req.source.id;
  await deleteBiblioEntry(id);
  res.status(204).send("Source deleted.");
});
