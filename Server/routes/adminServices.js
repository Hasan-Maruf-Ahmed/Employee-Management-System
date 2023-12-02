const router = require('express').Router();
const UserDetails = require('../models/UserDetails');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getDetails, getDetailsById, getUserById, updateDetails, deleteUser } = require('../controller/users');


//getAll 
router.get('/getAll', auth, roleCheck(['admin']),  getDetails);

//get by user ID
router.get('/:id', auth, roleCheck(['admin']), getUserById);

//get by userdetails ID
router.get('/details/:id', auth, roleCheck(['admin']), getDetailsById);

//update by ID
router.patch('/:id', auth, roleCheck(['admin']), updateDetails);

//delete by ID
router.delete('/:id', auth, roleCheck(['admin']), deleteUser);



module.exports = router;