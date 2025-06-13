/** Requires a logged-in user with the admin boolean set to true */
export default async function requireAdmin(req, res, next) {
  if (!req.user.admin)
    return res
      .status(403)
      .send(
        "You are not authorized to perform this action. Please see the About page to submit site feedback."
      );
  next();
}
