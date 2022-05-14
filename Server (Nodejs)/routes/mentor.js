var express = require('express');
var router = express.Router();
const mentorHelper = require('../Helper/MentorHelper')


router.post('/findMentor', function (req, res, next) {
    try {
        mentorHelper.findMentor(req.body.mentorId).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;