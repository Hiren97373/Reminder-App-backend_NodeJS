var express = require('express');
const { createReminder, allReminder, deleteReminder, updateReminder, findReminder } = require('../controller/reminder');
const Reminder = require('../model/reminder');
var router = express.Router();
const nodemailer = require('nodemailer');
const { redirect } = require('express/lib/response');

async function main(reminder) {

    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.AUTH_EMAIL, // sender address
        to: "hirenmoradiya704@gmail.com", // list of receivers
        subject: reminder.reminderMsg, // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}








/* GET home page. */
router.route('/create/reminder').post(createReminder);

router.route('/allreminder').get(allReminder);

router.route('/reminder/:id').get(findReminder);

router.route('/reminder/update/:id').patch(updateReminder);

router.route('/reminder/delete/:id').delete(deleteReminder);

setInterval(() => {
    Reminder.find({}, (err, reminderList) => {
        if (err) {
            console.log(err)
        }
        if (reminderList) {
            reminderList.forEach(reminder => {
                if (!reminder.isReminded) {
                    const now = new Date()
                    if ((new Date(reminder.remindAt) - now) < 0) {
                        Reminder.findByIdAndUpdate(reminder._id, { isReminded: true }, (err, reminObj) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log("Your time is over")
                            main(reminder).catch(console.error);
                            reminder.remove()

                        })
                    }
                }
            })
        }
    })
}, 1000)

module.exports = router;
