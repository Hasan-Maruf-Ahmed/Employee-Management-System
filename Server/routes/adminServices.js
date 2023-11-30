const router = require('express').Router();
const UserDetails = require('../models/UserDetails');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getDetails, getDetailsById, updateDetails, deleteUser } = require('../controller/users');


//getAll 
router.get('/getAll', auth, roleCheck(['admin']),  getDetails);

//get by ID
router.get('/:id', auth, roleCheck(['admin']), getDetailsById);

//update by ID
router.patch('/:id', auth, roleCheck(['admin']), updateDetails);

//delete by ID
router.delete('/:id', auth, roleCheck(['admin']), deleteUser);



module.exports = router;