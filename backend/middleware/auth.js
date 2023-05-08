const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

// middleware to check JWT cookie to see if user is authenticated to allow access
// on successful authentication it decodes the JWT and gets the user from the db sets the user to the request and calls the next function

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decode = jwt.verify(token, secret);
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(401).json({ message: "Not Authorized" }); 
    }
    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = auth;
