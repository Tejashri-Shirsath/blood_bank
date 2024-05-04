const express = require('express');
const { registerController, loginController } = require('../controllers/authController');

const router = express.Router();

//routers
router.post('/register',registerController);

//login || post
router.post("/login",loginController);

module.exports = router;