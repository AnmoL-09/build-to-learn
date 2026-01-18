const Session = require("../model/Session");

module.exports = async function auth(req, res, next) {
  const sid = req.cookies.session_id;
  if (!sid) return res.sendStatus(401);

  const session = await Session.findOne({ session_id: sid });
  if (!session) return res.sendStatus(401);

  if (session.expires_at < new Date()) {
    await session.deleteOne();
    return res.sendStatus(401);
  }

  req.user_id = session.user_id;
  next();
};
