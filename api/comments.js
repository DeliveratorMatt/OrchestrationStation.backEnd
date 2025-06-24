import express from "express";
const router = express.Router();
export default router;

import {
  addComment,
  getCommentsByInstrumentId,
  editComment,
  deleteComment,
} from "#db/queries/comments";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import requireAdmin from "#middleware/requireAdmin";

router
  .route("/:id")
  .get(async (req, res) => {
    const comments = await getCommentsByInstrumentId(Number(req.params.id));
    res.send(comments);
  })
  .post(
    requireBody(["category", "content", "user_id", "instrument_id"]),
    async (req, res) => {
      const { category, content, user_id, instrument_id } = req.body;

      const newComment = await addComment({
        user_id,
        category,
        content,
        instrument_id,
      });
      res.send(newComment);
    }
  )
  .put(
    requireUser,
    requireAdmin,
    requireBody(["category", "content"]),
    async (req, res) => {
      const { category, content } = req.body;
      const updatedComment = await editComment({
        user_id: req.user_id,
        category,
        comment,
        instrument_id: req.instrument_id,
      });
      res.send(updatedComment);
    }
  )
  .delete(requireUser, requireAdmin, async (req, res) => {
    const id = req.comment.id;
    await deleteComment(id);
    res.status(204).send("Comment deleted.");
  });
