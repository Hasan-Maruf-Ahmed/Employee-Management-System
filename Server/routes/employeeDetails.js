const router = require('express').Router();
const UserDetails = require('../models/UserDetails');

router.post('/', async (req, res) => {
    try {
        const userDetails= new UserDetails(req.body);
        await userDetails.save();
        res.status(200).send({message: 'Details added successfully'});
    }
    catch (err) {
        res.status(500).send({message: "Internal Server Error", error: err});
    }
})

module.exports = router;