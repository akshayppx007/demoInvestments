const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        
    },
    investmentAmount: {
        type: Number,
        required: [true, "Please enter investment amount"]
        },
    investmentPeriod: {
        type: Number,
        required: [true, "Please enter a investment period"]
    },
    ageOfInterest: {
        type: Number,
    },
    interestEarned: {
        type: Number,
    },
    interestPaid: {
        type: Number,
    },
    interestPending: {
        type: Number,
    },
    totalReturn: {
        type: Number,
    },
    status: {
        type: String,
        default: "Pending"
    },
    investmentTime: {
        type: Date,
    }
}, {timestamps: true});

module.exports = mongoose.model("Investment", investmentSchema);
