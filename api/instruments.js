import express from "express";
const router = express.Router();
export default router;

import {
  createInstrument,
  getAllInstruments,
  getInstrumentById,
} from "#db/queries/instruments";

import { addComment } from "#db/queries/comments";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import requireAdmin from "#middleware/requireAdmin";
import { addFavoriteInstrument } from "#db/queries/favorites";
import getUserFromToken from "#middleware/getUserFromToken";

router
  .route("/")
  .get(async (req, res) => {
    const allInstruments = await getAllInstruments();
    res.send(allInstruments);
  })
  .post(
    requireUser,
    requireAdmin,
    requireBody(
      "instrument_name",
      "description",
      "range",
      "famous_musicians",
      "famous_excerpts",
      "score_links",
      "history",
      "image_url"
    ),
    async (req, res) => {
      const newInstrument = await createInstrument(req.body);
      res.send(newInstrument);
    }
  );

router
  .route("/:id")
  .get(async (req, res) => {
    const instrument = await getInstrumentById(req.params.id);
    if (!instrument) return res.status(404).send("Instrument not found.");
    res.send(instrument);
  })
  .put(
    requireUser,
    requireAdmin,
    requireBody(
      "instrument_name",
      "description",
      "range",
      "famous_musicians",
      "famous_excerpts",
      "score_links",
      "history",
      "image_url"
    ),
    async (req, res) => {
      const updatedInstrument = await updateInstrument(req.params.id, req.body);
      res.send(updatedInstrument);
    }
  )
  .delete(requireUser, requireAdmin, async (req, res) => {
    await deleteInstrument(req.params.id);
    res.status(204).send("Instrument deleted.");
  });

router.route("/:id/favorite").post(getUserFromToken, async (req, res) => {
  const userId = req.user.id;
  const { instrumentId } = req.body;
  const favInstrument = await addFavoriteInstrument(userId, instrumentId);
  res.status(201).send(favInstrument);
});
router
  .route("/:id/comments")
  .post(requireUser, requireBody("category", "content"), async (req, res) => {
    const { category, content } = req.body;
    const newComment = await addComment({
      user_id: req.user.id,
      instrument_id: req.params.id,
      category,
      content,
    });
    res.send(newComment);
  });
