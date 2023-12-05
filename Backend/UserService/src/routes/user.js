const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchDetails = require('../middleware/fetchdetails');
const User = require('../models/User');
const axios = require('axios');

const jwtSecret = "Haha"; 

// Create a user
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, location } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            location
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const tokenPayload = { user: { id: newUser.id } };
        const authToken = jwt.sign(tokenPayload, jwtSecret);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Authenticate a user
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare the entered password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const tokenPayload = { user: { id: user.id } };
        const authToken = jwt.sign(tokenPayload, jwtSecret);

        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Get logged-in user details (Login Required)
router.post('/getuser', fetchDetails, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
});

module.exports = router;
