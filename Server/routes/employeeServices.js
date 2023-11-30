const router = require('express').Router();
const auth = require('../middleware/auth');
const { getDetails, getDetailsById, addDetails, updateDetails } = require('../controller/users');

//Get all employee data
router.get('/getAll', getDetails);

//Get an employee
router.get('/:id', getDetailsById);

//Add an employee details
router.post('/addDetails', auth, addDetails);

//Update an employee details
router.patch('/:id', updateDetails);



module.exports = router;