const mongoose = require("mongoose")

const indexSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter the title name"]
    },
    description: {
        type: String,
        required: [true, "please enter the Description"]
    },
    reminder: {
        type: Date,
        required: [true, "please enter the Date"]
    }
})

module.exports = mongoose.model("index", indexSchema)