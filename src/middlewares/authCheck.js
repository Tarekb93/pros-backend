const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.cookies.access_token) {
    console.log(req.cookies);
    const token = req.cookies.access_token;

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.locals.user = null;
        res.locals.authenticated = false;
        return res.redirect("login");
      }
      res.locals.user = decoded.username;
      res.locals.authenticated = true;
      next();
    });
  } else {
    res.locals.user = null;
    res.locals.authenticated = false;
    next();
  }
};
