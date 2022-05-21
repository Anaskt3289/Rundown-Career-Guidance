import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Api from '../../Api/Api'
import './Styles/Login.css'


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()

    const handleLogin = () => {
        if (!(email && password)) {
            setErrMsg('Enter the required details')
        } else {
            const details = { email, password }
            Api.post('/login', details).then(async (response) => {
                localStorage.setItem("RundownUser", JSON.stringify(response.data.user))
                navigate('/')
            }).catch((err) => {
                console.log(err);
                if (err.response.data.errMsg) {
                    setErrMsg(err.response.data.errMsg)
                }
            })
        }
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"
                    sx={{ backgroundColor: 'white' }}
                >
                    <Toolbar>

                        <img src="\Images\RundownLogo.png" alt="" className='Logo' onClick={() => navigate('/')} />

                        <h5 className='registerMentor'>Register to be mentor.</h5>
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={2} md={4}>  </Grid>
                <Grid item xs={8} md={4}>

                    <div className='LoginOutbox'>
                        <h5 className='loginHeading'>Login</h5>
                        <p className='errMsg'>{errMsg}</p>
                        <TextField id="outlined-basic" type="email" label="Email" variant="outlined" className='loginTextbox' onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" type="password" label="Password" variant="outlined" className='loginTextbox' sx={{ mt: 3 }} onChange={(e) => setPassword(e.target.value)} /> <br />


                        <Button variant="contained" className='loginBtn' sx={{ mt: 3 }} style={{ backgroundColor: "#CC747F" }} onClick={handleLogin}>Login</Button><br />

                        <p className='dontHaveAnAccount'>Don't have an account ? <u className='SignupinLogin' onClick={() => navigate('/signup')}>Signup</u></p>

                        <p className='OR'> <hr className='lineOR' /> OR <hr className='lineOR' /></p>
                        <Button variant="text" className='OTPloginBtn' style={{ color: 'black' }} onClick={() => navigate('/otplogin')}>Login with OTP</Button><br />

                    </div>
                </Grid>
                <Grid item xs={2} md={4}>  </Grid>
            </Grid>


        </div>
    )
}

export default Login
