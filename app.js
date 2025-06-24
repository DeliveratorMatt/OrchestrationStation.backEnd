import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import aboutRouter from "#api/about";
import biblioRouter from "#api/biblio";
import commentsRouter from "#api/comments";
import instrumentsRouter from "#api/instruments";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/images", express.static("public/images"));
app.use("/users", usersRouter);
app.use("/about", aboutRouter);
app.use("/biblio", biblioRouter);
app.use("/comments", commentsRouter);
app.use("/instruments", instrumentsRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
