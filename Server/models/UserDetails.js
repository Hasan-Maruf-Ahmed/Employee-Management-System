const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    joiningdate: {
        type: Date,
        default: Date.now(),
    },
    salary: {
        type: Number,
        required: true,
    },
    skills: [{
        type: String,
        required: true,
    }],
    education: {
        degree: {
            type: String,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        graduation: {
            type: Number,
            required: true,
        }
    }
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;