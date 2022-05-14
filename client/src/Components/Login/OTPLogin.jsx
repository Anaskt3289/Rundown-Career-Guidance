import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Api from '../../Api/Api'
import { useDispatch } from 'react-redux'
import { set_user_details } from '../../Redux/UserDetails/userDetailsSlice'


function OTPLogin({ pageType }) {
  const userDetails = useSelector(state => state.userDetails.value)
  const [otp, setOtp] = useState()
  const [counter, setCount] = useState(30)
  const [errMsg, setErrMsg] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCount(counter - 1)
      }, 1000)
    }
  }, [counter])

  const verifyPhoneNumber = () => {
    if (!phoneNumber) {
      setErrMsg('Enter the phone number')
    } else if (phoneNumber.length != 10) {
      setErrMsg('Enter 10 digits')
    } else {
      Api.post('/verifyPhoneNumber', { phoneNumber: phoneNumber }).then(() => {
        dispatch(set_user_details({
          user_details: { phone: phoneNumber, action: 'login' }
        }))
        navigate('/otpverification')
      }).catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.errMsg)
      })
    }
  }

  const verifyOTP = () => {
    const data = {
      otp: otp,
      ...userDetails
    }
    Api.post('/verifyOTP', data).then((response) => {
      if(response.data.user){
        localStorage.setItem("RundownUser", JSON.stringify(response.data.user))
      }
      navigate('/')
    }).catch((err) => {
      console.log(err);
      setErrMsg(err.response.data.errMsg)
    })
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"
          sx={{ backgroundColor: 'white' }}
        >
          <Toolbar>

            <img src="\Images\RundownLogo.png" alt="" className='Logo' />

            <h5 className='registerMentor'>Register to be mentor.</h5>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={2} md={4}>  </Grid>
        <Grid item xs={8} md={4}>

          <div className='LoginOutbox'>
            <h5 className='loginHeading'>Login with OTP</h5>
            <p className='errMsg'>{errMsg}</p>
            {
              pageType ? <TextField id="outlined-basic" label="Enter OTP" variant="outlined" className='loginTextbox' onChange={(e) => setOtp(e.target.value)} /> :
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" className='loginTextbox' onChange={(e) => setPhoneNumber(e.target.value)} />
            }




            <Button variant="contained" className='loginBtn' sx={{ mt: 3 }} style={{ backgroundColor: "#CC747F" }}
              onClick={pageType ? verifyOTP : verifyPhoneNumber}>{
                pageType ? 'Verify OTP' : 'Login'
              }</Button><br />
            {pageType ? <p>{counter === 0 ? <u>Resend OTP</u> : `Resend OTP in ${counter} s`}</p> : ''}

            <p className='OR'> <hr className='lineOR' /> OR <hr className='lineOR' /></p>
            <Button variant="text" className='OTPloginBtn' style={{ color: 'black' }} onClick={() => navigate('/login')}>Login with Email</Button><br />

          </div>
        </Grid>
        <Grid item xs={2} md={4}>  </Grid>
      </Grid>
    </div>
  )
}

export default OTPLogin
