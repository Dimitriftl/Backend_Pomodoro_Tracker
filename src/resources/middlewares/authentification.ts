const jwt = require("jsonwebtoken");

const authentification = (req: any, res: any, next: any) => {
  req.session.token = null;
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ ok: false, error: "No token provided" });
  }
  console.log(authorization);
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ ok: false, error: "Invalid token" });
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
};

module.exports = { authentification };
