const userModel = require("./models/user");
const counsellorModel = require("./models/counsellor");
const jwt = require("jsonwebtoken");
const secrets = require("./socket_server/secrets");
const secret = secrets.secret;

// consult: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

exports.issueTokenToUser = function (req, res, next) {
  userModel.getUserCredentialsByUsername(req.body.username, function (user) {
    if (user == null) return res.send(401);

    // Can't find user with username in database
    if (!user) return res.send(401);

    // incorrect password
    if (user.password !== req.body.password) return res.send(401); 

    var expires = moment().add(3, "hours").valueOf();
    var token = jwt.encode({
      iss: user.username,
      exp: expires
    }, secret);

    res.json({
      token : token,
      expires: expires,
      user: user.toJSON()
    });       
  });

}

exports.issueTokenToCounsellor = function (req, res, next) {
  counsellorModel.getCounsellorCredentialsByEmail(req.body.email, function (counsellor) {
    if (counsellor == null) return res.send(401);

    if (!counsellor) return res.send(401);

    if (counsellor.password !== req.body.password) return res.send(401);

    var expires = moment().add(3, "hours").valueOf();
      var token = jwt.encode({
        iss: counsellor.email,
        exp: expires
      }, secret);

      res.json({
        token : token,
        expires: expires,
        user: counsellor.toJSON()
      }); 
  });
}

exports.verifyToken = function (req, res, next) {
  console.log("hello");
  var token = (req.body && req.body.access_token) || 
  (req.query && req.query.access_token) || 
  req.headers['x-access-token'];

  if (token) {
    var decoded = jwt.decode(token, secret, function(err, result) {
      if (err) {
        // Could not decode token
        return res.status(401).end(); // TODO: display message on frontend
      }
      else {
        // Token decoded
        if (decoded.exp <= Date.now()) {
          return res.end('Access token has expired', 400);
        }

        req.user = result;
        return next();
      }
    });
    
    
  } else {
    // No token; not signed in
    return res.status(401).end(); // TODO: display message on frontend
  }   
}

