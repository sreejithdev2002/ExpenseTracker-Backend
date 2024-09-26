const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["groceries", 'entertainment', 'rent', 'income', 'others'],
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isRecurring: {
        type: Boolean,
        default: false,
    }
});

module.exports = new mongoose.model("expense", expenseSchema);