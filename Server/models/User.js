const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: [String],
        enum: ['employee', 'admin'],
        default: ['employee'],
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: "1d",
    })

    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;