const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name"],
    },
    role: {
        type: String,
        default: "Employee", // Assuming "Employee" is the default role
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    }
});

const User = mongoose.models.users || mongoose.model("users",usersSchema);

module.exports = User;
