const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    aboutYou: {
        type: String,
        required: true
    },
    highestQualification: {
        type: String,
        required: true
    },
    availibility: {
        type: String,

        
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
       
    }
});

const Resume = mongoose.models.resumes || mongoose.model("resumes", resumeSchema);

module.exports = Resume;
