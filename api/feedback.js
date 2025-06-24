import express from "express";
const router = express.Router();
export default router;

import { postFeedback } from "#db/queries/feedback";

import requireBody from "#middleware/requireBody";

router
  .route("/")
  .post(requireBody(["user_id", "content"]), async (req, res) => {
    const { user_id, content } = req.body;

    const newFeedback = await postFeedback({
      user_id,
      content,
    });
    res.send(newFeedback);
  });
