import express from "express";
const router = express.Router();
export default router;

import { addComment } from "#db/queries/comments";

import requireUser from "#middleware/requireUser";

router
  .route("/")
  .post(requireUser, requireBody[("category", "content")], async (req, res) => {
    //not sure how to handle About comments since their fields will be different
  });
