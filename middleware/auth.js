const { User } = require("../models/User");

let auth = (req, res, next) => {
  // client cookie에서 token 가져옴
  let token = req.cookies.x_auth;
  // token을 복호화하여 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
