const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: "e515751243f3a6",
        pass: "4f10ede2986149",
    },
});
module.exports = transporter;