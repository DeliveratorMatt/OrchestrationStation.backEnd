import express from "express";
const router = express.Router();
export default router;

import {
  createInstrument,
  getAllInstruments,
  getInstrumentById,
  updateInstrument,
  deleteInstrument,
  getMusiciansByInstrumentId,
  getPiecesByInstrumentId,
} from "#db/queries/instruments";

import { addComment } from "#db/queries/comments";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import requireAdmin from "#middleware/requireAdmin";

router
  .route("/")
  .post(
    requireUser,
    requireAdmin,
    requireBody(["family, name, description, range, history"]),
    async (req, res) => {
      const { family, instrument_name, description, range, history } = req.body;
      const newInstr = await createInstrument(
        family,
        instrument_name,
        description,
        range,
        history
      );
      res.send(newInstr);
    }
  )
  .get(async (req, res) => {
    let allInstruments = await getAllInstruments();
    res.send(allInstruments);
  });

router.param("id", async (req, res, next, id) => {
  const instrument = await getInstrumentById(id);
  if (!instrument) return res.status(404).send("Instrument not found.");
  req.instrument = instrument;
  next();
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const musicians = await getMusiciansByInstrumentId(id);
      const excerpts = await getPiecesByInstrumentId(id);
      instrument.musicians = musicians;
      instrument.excerpts = excerpts;
      res.send(instrument);
    } catch (err) {
      next(err);
    }
  })
  .put(
    requireUser,
    requireAdmin,
    requireBody(["family, name, description, range, history"]),
    async (req, res) => {
      const { family, instrument_name, description, range, history } = req.body;
      const updatedInstrument = await updateInstrument(
        family,
        instrument_name,
        description,
        range,
        history
      );
      res.send(updatedInstrument);
    }
  )
  .delete(requireUser, requireAdmin, async (req, res) => {
    const id = req.instrument.id;
    await deleteInstrument(id);
    res.status(204).send("Instrument deleted.");
  });

router
  .route("/:id/comments")
  .post(requireUser, requireBody(["category", "content"]), async (req, res) => {
    const { category, content } = req.body;
    const newComment = await addComment({
      user_id: req.user.id,
      category,
      content,
      instrument_id: req.instrument.id,
    });
    res.send(newComment);
  });
