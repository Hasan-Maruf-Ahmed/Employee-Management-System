const router = require('express').Router();
const UserDetails = require('../models/UserDetails');

//Get all employee data
router.get('/getAll', async (req, res) => {
    try {
        const allEmployees = await UserDetails.find();
        res.status(200).json(allEmployees);
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
});

//Get a employee
router.get('/:id', async (req, res) => {
    try {
        // const employee = await UserDetails.findById(req.params.id);
        const employee = await UserDetails.findOne({ id: req.params.id });

        if(!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    } 
});

//Add a new employee
router.post('/addDetails', async (req, res) => {
    try {
        const userDetails= new UserDetails(req.body);
        await userDetails.save();
        res.status(200).send({message: 'Details added successfully'});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error", error: err.message });
    }
})

//Update an employee details
router.patch('/:id', async (req, res) => {
    try {
        const updatedEmployee = await UserDetails.findOneAndUpdate(
            { id: req.params.id},
            req.body,
            { new: true }
            );
        if(!updatedEmployee){
            return res.status(404).send({ message: "Employee not found" });
        }

        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).send({message: "Internal Server Error", error: err.message });
    }
});

//Delete an employee 
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await UserDetails.findOneAndDelete({ id: req.params.id });

        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).send({message: "Internal Server Error", error: err.message });
    }
});



module.exports = router;