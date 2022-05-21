var express = require('express');
var router = express.Router();
const messagesHelper = require('../Helper/MessagesHelper')


router.post('/addmessage', function (req, res, next) {
    try {
        messagesHelper.addmessage(req.body).then(() => {
            res.status(200).json({msg:'Message added'})
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;