import express from "express";
const router = express.Router();
export default router;

//import necessary queries
import {
  createInstrument,
  getAllInstruments,
  getInstrumentById,
  updateInstrument,
} from "#db/queries/instruments";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router
  .route("/")
  .post(
    requireUser,
    requireBody[
      "family, name, description, range, famous_musicians, excerpts, scores, history"
    ],
    async (req, res) => {
      //since this "require admin" code gets reused several places,
      //it would be ideal to put it in a param, probably?
      //or should we make a new middleware, requireAdmin??
      let admin = req.user.admin;
      if (!admin) {
        return res
          .status(403)
          .send(
            "You are not authorized to perform this action. Please see the About page to submit site feedback."
          );
      }
      const {
        family,
        name,
        description,
        range,
        famous_musicians,
        excerpts,
        scores,
        history,
      } = req.body;
      const newInstr = await createInstrument(
        family,
        name,
        description,
        range,
        famous_musicians,
        excerpts,
        scores,
        history
      );
      res.send(newInstr);
    }
  )
  .get(async (req, res) => {
    let allInstruments = getAllInstruments();
    res.send(allInstruments);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const instrument = await getInstrumentById;
    if (!instrument) return res.status(404).send("Instrument not found.");
    res.send(instrument);
  })
  .put(
    requireUser,
    requireBody[
      "family, name, description, range, famous_musicians, excerpts, scores, history"
    ],
    async (req, res) => {
      //requireAdmin
      const {
        family,
        name,
        description,
        range,
        famous_musicians,
        excerpts,
        scores,
        history,
      } = req.body;
      const updatedInstrument = await updateInstrument(
        family,
        name,
        description,
        range,
        famous_musicians,
        excerpts,
        scores,
        history
      );
      res.send(updatedInstrument);
    }
  );
