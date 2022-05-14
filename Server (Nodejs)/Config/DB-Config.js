const MongoClient = require('mongodb').MongoClient
const state = {
    db: null
}
module.exports.connect = function (done) {
    const url = 'mongodb+srv://anaskt:Kl53n3289@cluster0.lbdzo.mongodb.net/IncubationManagement?retryWrites=true&w=majority'
    const dbname = 'Rundown'

    MongoClient.connect(url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()
    })

}
module.exports.get = function () {
    return state.db;
}