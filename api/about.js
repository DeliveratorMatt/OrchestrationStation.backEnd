import express from "express";
const router = express.Router();
export default router;

import { submitFeedback } from "#db/queries.about";

import requireUser from "#middleware/requireUser";

router
  .route("/")
  .post(requireUser, requireBody[("category", "content")], async (req, res) => {
    const userId = req.user.id;
    const newFeedback = await submitFeedback({ userId, category, content });
    res.send(newFeedback);
  });
