const { response } = require('express');
var express = require('express');
var router = express.Router();
const userHelper = require('../Helper/UserHelper')

const serviceSID = process.env.serviceSID
const accountSID = process.env.accountSID
const authTocken = process.env.authTocken
const client = require('twilio')(accountSID, authTocken)


router.get('/', function(req, res, next) {
  res.send("Rundown server")
});

router.post('/checkUserExist', function (req, res, next) {
  try {
    userHelper.checkUserExist(req.body.email, req.body.phone).then((resp) => {
      if (resp.userExist) {
        res.status(400).json({ errMsg: 'User already exist ' })
      } else {
        client.verify
          .services(serviceSID)
          .verifications.create({
            to: `+91${req.body.phone}`,
            channel: "sms"
          }).then((resp) => {
            res.status(200).json({ msg: 'User verification success' })
          }).catch((err) => {
            console.log(err);
          })
      }
    }).catch((err) => {
      console.log(err);
    })
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', function (req, res, next) {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).json({ errMsg: 'Enter the required details' })
    } else {
      userHelper.verifyUser(req.body).then((response) => {
        if (response.status) {
          res.status(200).json({user:response.user})
        } else if (response.userBlocked) {
          res.status(400).json({ errMsg: 'This account is blocked' })
        } else {
          res.status(400).json({ errMsg: 'Incorrect email or password' })
        }
      }).catch((err) => {
        res.status(400).json({ errMsg: err })
        console.log(err);
      })
    }
  } catch (err) {
    res.status(400).json({ errMsg: err })
    console.log(err);
  }
});

router.post('/verifyOTP', function (req, res, next) {
  try {
    let number = `+91${req.body.phone}`
    let otp = req.body.otp
    client.verify
      .services(serviceSID)
      .verificationChecks.create({
        to: number,
        code: otp
      }).then(async (resp) => {
        if (resp.valid) {
          if (req.body.action === 'signup') {
            userHelper.addUserDetails(req.body).then(() => {
              res.status(200).json('Signup success')
            }).catch((err) => {
              console.log(err);
            })
          } else {
            userHelper.verifyOTPUser(req.body.phone).then((response) => {
              if (response.userBlocked) {
                res.status(400).json({ errMsg: 'User account blocked' })
              } else {
                res.status(200).json({ user: response.user })
              }
            }).catch((err) => {
              console.log(err);
            })
          }
        } else {
          res.status(400).json({ errMsg: 'Entered OTP is incorrect' })
        }
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
});

router.post('/getAptitudeQuestions', function (req, res, next) {
  try {
    userHelper.getAptitudeQuestions(req.body.Type).then((response) => {
      res.status(200).json(response)
    }).catch((err) => {
      res.status(400).json({ errMsg: err })
      console.log(err);
    })
  } catch (err) {
    res.status(400).json({ errMsg: err })
    console.log(err);
  }
});

router.post('/verifyPhoneNumber', function (req, res, next) {
  try {
    userHelper.verifyPhoneNumber(req.body.phoneNumber).then((response) => {
      if (response.phoneNumberExist) {
        client.verify
          .services(serviceSID)
          .verifications.create({
            to: `+91${req.body.phoneNumber}`,
            channel: "sms"
          }).then((resp) => {
            res.status(200).json({ msg: 'Phone Number Verified' })
          }).catch((err) => {
            console.log(err);
          })
      } else {
        res.status(400).json({ errMsg: 'Phone number not registered' })
      }
    }).catch((err) => {
      res.status(400).json({ errMsg: err })
      console.log(err);
    })

  } catch (err) {
    res.status(400).json({ errMsg: err })
    console.log(err);
  }
});

module.exports = router