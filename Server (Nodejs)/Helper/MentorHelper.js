const db = require('../Config/DB-Config')
const collection = require('../Config/Collection');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');

module.exports = {
    findMentor:(mentorId)=>{
        return new Promise(async(resolve , reject)=>{
            let mentor = await db.get().collection(collection.userCollection).findOne({_id:ObjectId(mentorId)})
            resolve(mentor)
        })
    }
}