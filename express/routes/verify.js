const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) return res.status(403).send({ message: "access denied" });
  try {
    const verify = jwt.verify(token, process.env.sercretKey);
    const decode = jwt.decode(token, { complete: true });
    console.log(decode);
    req.user = verify;
    next();
    //res.send(req.user);
  } catch (err) {
    res.status(401).send("Invalid access token");
  }
};

module.exports = verifyToken;
