const CryptoJS = require("crypto-js");

function restrictedRoute (req, res, next) {
    if(!req.query.token) return res.status(401).send("Permission required");
    const hashToken = process.env.HASH_TOKEN || "123456789";
    if(CryptoJS.SHA256(req.query.token).toString()!== hashToken) return res.status(401).send("Permission required");
    next()
}


module.exports = restrictedRoute;