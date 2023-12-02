const UserDetails = require('../models/UserDetails');
const User = require('../models/User');

//get all user details
const getDetails = async (req, res) => {
    try {
        const allEmployees = await User.find().select("-password -__v").populate("userDetails", "-_id -__v");
        res.status(200).json(allEmployees);
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
}
//get by ID
const getDetailsById = async (req, res) => {
    try {
        // const employee = await UserDetails.findById(req.params.id);
        const employee = await UserDetails.findOne({ id: req.params.id }).populate("user", "username email role -_id");

        if(!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    } 
}

//add details
const addDetails = async (req, res) => {
    try {
        const userDetails= new UserDetails({...req.body, user: req.user._id});
        await userDetails.save();
        await User.updateOne({
            _id: req.user._id,
        }, {
            userDetails: userDetails._id
        })
        res.status(200).send({message: 'Details added successfully'});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error", error: err.message });
    }
}

//update by ID
const updateDetails = async (req, res) => {
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
}

//delete by ID
const deleteUser = async (req, res) => {
    try {
        const deletedEmployee = await User.findById(req.params.id).populate("userDetails");

        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        // Check if user details are populated
        if (!deletedEmployee.userDetails) {
            return res.status(404).send({ message: 'User details not found for the employee' });
        }

        // Delete the associated UserDetails
        await UserDetails.findByIdAndDelete(deletedEmployee.userDetails);

        // Delete the employee
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Employee and associated details deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
};


module.exports = { getDetails, getDetailsById, addDetails, updateDetails, deleteUser };