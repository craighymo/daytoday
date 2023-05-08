const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10); 
const expiration = Date.now() + 12 * 60 * 60 * 1000; // cookie expiration (half a day)

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // checks to make sure all fields have been entered
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Please complete all fields" });
    }

    // checks if the requested username is already taken 
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const hash = bcrypt.hashSync(password, salt); // hashes provided password

    // creates a new user
    await User.create({ email, username, password: hash });
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // checks to see if user and password are correct
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ error: "Username or password are incorrect" });
    }

    // if username and password are correct a JWT is generated
    const token = jwt.sign({ userId: user._id, expiration }, secret);

    // creates a cookie with the token
    res.cookie("jwt", token, {
      expires: new Date(expiration),
      httpOnly: true, // only the server and browser can read the cookie
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json(error);
  }
};

// logs user out and clears JWT cookie
const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json(error);
  }
};

// used to check status of auth middleware
const authStatus = (req, res) => {
  try {
    res.status(200).json({ message: "User is authorized" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  login,
  logout,
  register,
  authStatus,
};
