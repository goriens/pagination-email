const path = require("path");
const express = require("express");
const User = require("../models/users.models");
const router = express.Router();
const transporter = require("../configs/mail");

router.get("/", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 5;
        const skip = (page - 1) * pagesize;
        const user = await User.find()
            .skip(skip)
            .limit(pagesize)
            .lean()
            .exec();
        const totalPages = Math.ceil(await User.find().countDocuments() / pagesize);
        return res.status(200).send({ user, totalPages });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        transporter.sendMail({
            from: '"Gour Admin" <gour@gour.com',
            to: user.email,
            subject: `Welcome to ABC system ${user.first_name, user.last_name}`,
            text: `Hi, ${user.first_name} Please confirm your email address`,
            alternatives: [
                {
                    contentType: 'text/html',
                    path: path.join(__dirname, "../mails/users.created.mail.html"),
                },
            ]
        })
        return res.status(200).send({ message: ` Please welcome ${user.first_name} ${user.last_name}` });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

module.exports = router;