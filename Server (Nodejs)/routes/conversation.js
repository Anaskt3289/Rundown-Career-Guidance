var express = require('express');
var router = express.Router();
const messagesHelper = require('../Helper/MessagesHelper')
const mentorHelper = require('../Helper/MentorHelper')


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
router.post('/getconversations', async function (req, res, next) {
    try {
        let mentorId
        let conversation = await messagesHelper.getConversations(req.body.userId)
        for (let Id of conversation.conversation) {
            if (Id !== req.body.userId) {
                mentorId = Id
            }
        }
        let mentor = await mentorHelper.findMentor(mentorId)
        console.log(conversation._id);
        let messages = await messagesHelper.getMessages(conversation._id+"")
        let response = {
            conversationId : conversation._id,
            mentor: mentor,
            messages : messages
        }
        res.status(200).json(response)

    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;