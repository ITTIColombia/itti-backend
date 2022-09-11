const CryptoJS = require("crypto-js");

function restrictedRoute (req, res, next) {
    console.log(process.env.HASH_TOKEN);
    if(!req.query.token) return res.status(401).send("Permission required");
    const hashToken = process.env.HASH_TOKEN || "7278706149756051bd299c2b5d3343f041ac65f7b57f41d19e33095e67fb6230";
    if(CryptoJS.SHA256(req.query.token).toString()!== hashToken) return res.status(401).send("Permission required");
    next()
}


module.exports = restrictedRoute;