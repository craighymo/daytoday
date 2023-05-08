const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    login,
    logout,
    register,
    authStatus,
} = require('../controllers/userController');

router.post("/login", login);
router.get("/logout", auth, logout);
router.post("/register", register);
router.get("/authStatus", auth, authStatus);

module.exports = router;