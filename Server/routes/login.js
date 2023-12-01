const router = require('express').Router();
const User = require('../models/User');
const validate = require('../utils/validateLogin');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message});
        }
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const token = user.generateAuthToken();
        // console.log('Generated Token:', token);
        res.status(200).send({ username: user.username, email: user.email, role: user.role, token: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

module.exports = router;