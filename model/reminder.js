const mongoose = require("mongoose")

const reminderSchema = new mongoose.Schema({
    reminderMsg: {
        type: String,
        required: true
    },
    remindAt: {
        type: Date,
        required: true
    },
    isReminded: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Reminder", reminderSchema)