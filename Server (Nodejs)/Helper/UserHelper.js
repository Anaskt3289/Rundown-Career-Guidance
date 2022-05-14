const db = require('../Config/DB-Config')
const collection = require('../Config/Collection')
const bcrypt = require('bcrypt')
const async = require('hbs/lib/async')

module.exports = {
    checkUserExist: (email, phone) => {
        return new Promise(async (resolve, reject) => {
            let userExist = await db.get().collection(collection.userCollection).findOne({ $or: [{ email: email }, { phone: phone }] })
            if (userExist) {
                resolve({ userExist: true })
            } else {
                resolve({ userExist: false })
            }
        })
    },
    addUserDetails: (details) => {
        return new Promise(async (resolve, reject) => {
            let { firstName, lastName, email, phone, password, qualification, address, aboutSelf } = details

            password = await bcrypt.hash(password, 10)
            const userObj = {
                firstName,
                lastName,
                email,
                phone,
                password,
                qualification,
                address,
                aboutSelf
            }
            db.get().collection(collection.userCollection).insertOne(userObj).then(() => {
                resolve()
            })
        })
    },
    verifyUser: (details) => {
        return new Promise(async (resolve, reject) => {
            let res = {}
            let user = await db.get().collection(collection.userCollection).findOne({ email: details.email })

            if (user) {
                if (user.blocked) {
                    res.status = false
                    res.userBlocked = true
                    resolve(res)
                } else {
                    bcrypt.compare(details.password, user.password).then((state) => {
                        if (state) {
                            res.status = true
                            res.userBlocked = false
                            res.user = user
                            resolve(res)
                        } else {
                            res.status = false
                            res.userBlocked = false
                            resolve(res)
                        }

                    })
                }
            } else {
                res.status = false
                res.userBlocked = false
                resolve(res)
            }
        })
    },
    verifyOTPUser: (number) => {
        return new Promise(async(resolve, reject) => {
            let user = await db.get().collection(collection.userCollection).findOne({phone:number})
            if(user.blocked){
                resolve({userBlocked : true})
            }else{
                resolve({user:user})
            }
        })
    },
    getAptitudeQuestions: (type) => {
        return new Promise(async (resolve, reject) => {
            let Questions = await db.get().collection(collection.aptitudeQuestions).findOne({ Type: type })
            resolve(Questions)
        })
    },
    verifyPhoneNumber: (number) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.userCollection).findOne({ phone: number })
            if (user) {
                resolve({ phoneNumberExist: true })
            } else {
                resolve({ phoneNumberExist: false })
            }
        })
    }
}