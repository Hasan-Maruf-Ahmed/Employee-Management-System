const router = require('express').Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/rolecheck');

router.get('/details',auth, roleCheck(['admin']), (req, res) => {
    res.status(200).send({ message: "User authotized" });
})

module.exports = router;