const CognitoExpress = require('cognito-express')

const cognitoExpress = new CognitoExpress({
    region: "us-east-1",
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    tokenExpiration: 3600000 // 1 hour
});

exports.validateAuth = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      cognitoExpress.validate(token, (err) => {
        if(err) {
            res.status(401).send("Unauthorized, invalid token");
        } else {
            next();
        }
      });
  } else {
      res.status(401).send("Unathorized");
  }
}



