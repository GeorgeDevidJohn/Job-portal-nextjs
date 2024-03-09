const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    resumeId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'rejected', 'accepted', 'pending'],
        default: 'pending'
    },
    employerStatus: {
        type: String,
        enum: ['viewed', 'not viewed'],
        default: 'not viewed'
    },
    dateApplied: {
        type: String,
        default: Date.now
    }
});

const Request = mongoose.models.requests || mongoose.model("requests", requestSchema);

module.exports = Request;
