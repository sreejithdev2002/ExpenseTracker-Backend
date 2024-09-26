const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['groceries', 'entertainment', 'rent', 'others']
    },
    amount: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        requried: true,
    },
    year: {
        type: Number,
        required: true,
    },
    warning: {
        type: Number,
        default: 90,
    }
});

module.exports = new mongoose.model("budget", budgetSchema);