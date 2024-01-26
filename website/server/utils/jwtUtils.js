const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenMatch = authHeader.match(/^Bearer (.+)$/);

  if (tokenMatch && tokenMatch[1]) {
    const token = tokenMatch[1];

    jwt.verify(token, process.env.accessTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      next();
    });
  } else {
    return res.status(406).json({ message: "Invalid Authentication" });
  }
};

module.exports = { authenticateJWT };
