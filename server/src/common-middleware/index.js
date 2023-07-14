// // const jwt = require('jsonwebtoken');


// // exports.requireSignin = (req, res, next) =>{
// //     console.log("req",req);
// //     if (req.headers.authorization) {
// //       console.log("12345");
// //         // console.log(req.headers.authorization);
// //     const token =req.headers.authorization.split(" ")[1];
// //     // console.log(token);
// //     const user = jwt.verify(token, process.env.JWT_SECRET);
// //     req.body = user;
// //     // console.log( req.body = user);

// //     }else {
// //         return res.status(400).json({ message: "Authorization required" });
// //       }
// //       next();
// //     }
// const jwt = require('jsonwebtoken');

// exports.requireSignin = (req, res, next) => {
//   console.log(req);
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(' ')[1];
//     // Replace 'YOUR_SECRET_KEY' with the actual secret key used to sign the Cognito token
//     // console.log(token);

//     const secretKey = process.env.JWT_SECRET;

//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       req.user = decoded;
//       next();
//     });
//   } else {
//     return res.status(401).json({ message: 'Authorization required' });
//   }
// };

const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

// const app = express();
// const port = 3000;

let pems = {};

class AuthMiddleware {
  constructor() {
    this.poolRegion = 'ap-south-1';
    this.userPoolId = 'ap-south-1_k1WG6VJy5';
    this.setUp();
  }

  verifyToken(req, resp, next) {
    const { token } = req.body;
    console.log(token);
    if (!token) return resp.status(401).end();

    let decodedJwt = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end();
      return;
    }
    console.log(decodedJwt);
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    console.log(pem);
    if (!pem) {
      resp.status(401).end();
      return;
    }
    jwt.verify(token, pem, function (err, payload) {
      if (err) {
        resp.status(401).end();
        return;
      } else {
        next();
      }
    });
  }

  async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful';
      }
      const data = await response.json();
      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      console.log('got PEMS');
    } catch (error) {
      console.log(error);
      console.log('Error! Unable to download JWKs');
    }
  }
}

module.exports = AuthMiddleware;
// app.use(express.json());

// app.post('/protected-route', authMiddleware.verifyToken, (req, res) => {
//   // The route handler for your protected route
//   res.send('Access granted to protected route!');
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
