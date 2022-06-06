const User = require("../users/User.model");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) res.status(401).json({ message: "Unauthorized use" });

  token = token.substring(token.lastIndexOf(" ", token.length)).trim();

  try {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (decoded) {
        const user = await User.find({ _id: decoded.sub });

        if (!user) res.status(401).json({ message: "Unauthorized use" });
        else next();
      } else {
        res.status(401).json({ message: "Unauthorized use" });
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized use" });
  }
};
