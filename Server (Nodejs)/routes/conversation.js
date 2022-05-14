var express = require('express');
var router = express.Router();
const messagesHelper = require('../Helper/MessagesHelper')


router.post('/', function (req, res, next) {
    try {
        const { userId, mentorId } = req.body
        messagesHelper.addConversation(userId, mentorId).then(() => {
            res.status(200).json({ msg: 'Conversation added' })
            console.log('Conversation added');
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (err) {
        res.status(400).json(err)
    }
});
router.post('/getconversations', function (req, res, next) {
    try {
        messagesHelper.getConversations(req.body.userId).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;