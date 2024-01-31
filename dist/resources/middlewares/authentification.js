"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authentification = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ ok: false, error: "No token provided" });
    }
    // used to get the token from the header because the token is sent like this: Bearer token
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ ok: false, error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};
module.exports = { authentification };
