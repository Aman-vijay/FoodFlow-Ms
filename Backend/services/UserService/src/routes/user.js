const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const fetchDetails = require('../middleware/fetchdetails');;

const {createUser,getLocation,getUserById,Login} = require("../controllers/User")



// Create a user
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], createUser);

// Authenticate a user
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
],Login);

router.post('/getuser', fetchDetails, getUserById);


router.post('/getlocation',getLocation);

module.exports = router;
