import express from "express";
const router = express.Router();
export default router;

import getUserFromToken from "#middleware/getUserFromToken";
import { getUserById } from "#db/queries/users";
import { getFavoritesByUserId } from "#db/queries/favorites";

router.use(getUserFromToken);

router.route("/").get(getUserFromToken, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  const favorites = await getFavoritesByUserId(req.user.id);
  res.send({ ...user, favorites });
});
