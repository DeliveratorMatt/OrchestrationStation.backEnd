import express from "express";
const router = express.Router();
export default router;

import { getAllSources, addSource, deleteSource } from "#db/queries/biblio";

import requireAdmin from "#middleware/requireAdmin";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router
  .route("/")
  .get(async (req, res) => {
    let sources = await getAllSources();
    res.status(204).send(sources);
  })
  .post(
    requireUser,
    requireAdmin,
    requireBody[("source", "category", "url")],
    async (req, res) => {
      const { source, category, url } = req.body;
      const newSource = await addSource({ source, category, url });
      res.send(newSource);
    }
  );

router.route("/:id").delete(requireUser, requireAdmin, async (req, res) => {
  const id = req.source.id;
  await deleteSource(id);
  res.status(204).send("Source deleted.");
});
