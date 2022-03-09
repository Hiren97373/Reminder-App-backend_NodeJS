const { redirect } = require("express/lib/response");
const Reminder = require("../model/reminder");

//create Reminder
exports.createReminder = async (req, res, next) => {
    try {

        const reminder = await Reminder.create(req.body);
        res.status(200).json({
            status: "success",
            reminder
        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "reminder is not created"
        })
    }
}

//All reminder
exports.allReminder = async (req, res, next) => {
    try {

        const reminder = await Reminder.find();



        res.status(200).json({
            status: "success",
            reminder
        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "All Reminder is not show"
        })
    }
}


//find one reminder
exports.findReminder = async (req, res, next) => {
    try {

        const reminder = await Reminder.findById(req.params.id);
        res.status(200).json({
            status: "success",
            reminder
        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "Reminder is not found"
        })
    }
}


//Update reminder
exports.updateReminder = async (req, res, next) => {
    try {

        const rem = await Reminder.findByIdAndUpdate(req.params.id, req.body)

        const reminder = await Reminder.findById(req.params.id)

        res.status(200).json({
            status: "success",
            reminder
        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "  update Reminder is not working"
        })
    }
}



//Delete Reminder
exports.deleteReminder = async (req, res, next) => {
    try {

        const reminder = await Reminder.findById(req.params.id);
        await reminder.remove();

        res.status(200).json({
            status: "successfully deleted",

        })


    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "Delete Reminder is not show"
        })
    }
}