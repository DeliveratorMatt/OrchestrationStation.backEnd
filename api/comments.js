import express from "express";
const router = express.Router();
export default router;

import { getCommentsByInstrumentId, editComment, deleteComment } from #db/queries/comments;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router
    .route("/:id")
    .put(requireUser,
    requireAdmin,
    requireBody ["category", "content"], async(req, res) => {
        const {category, content} = req.body;
        const updatedComment = await editComment({user_id: req.user_id, category, comment, instrument_id: req.instrument_id});
        res.send(updatedComment);
    })
    .delete(requireUser, requireAdmin, async(req, res) => {
        const id = req.comment.id;
        await deleteComment(id);
        res.status(204).send("Comment deleted.");
    });