const db = require('../Config/DB-Config')
const collection = require('../Config/Collection');
const async = require('hbs/lib/async');

module.exports = {
    addConversation:(userId ,mentorId)=>{
        // let conversation = {
        //     user : userId,
        //     mentor : mentorId
        // }
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.conversations).insertOne({conversation:[userId,mentorId]}).then(()=>{
                resolve()
            })
        })
    },
    getConversations:(userId)=>{
        return new Promise(async(resolve , reject)=>{
            let conversations = await db.get().collection(collection.conversations).findOne({conversation:{$in:[userId]}})
            resolve(conversations)
        })
    },
    addmessage:(details)=>{
        return new Promise((resolve , reject)=>{
            db.get().collection(collection.messages).insertOne(details).then(()=>{
                resolve()
            })
        })
    },
    getMessages:(conversationId)=>{
        return new Promise(async(resolve , reject)=>{
            let messages = await db.get().collection(collection.messages).find({conversationId:conversationId}).toArray()
            resolve(messages)
        })
    }
}