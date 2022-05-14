import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {set_user_details} from '../../Redux/UserDetails/userDetailsSlice'
import './Styles/Signup.css'

function Signup() {
    const dispatch = useDispatch()
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        qualification: '',
        address: '',
        aboutSelf: ''
    }
    const [userDetails, setUserDetails] = useState(initialState)
    const [errMsg, setErrMsg] = useState()
    const navigate = useNavigate()

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const handleSubmit = () => {
        if (!(userDetails.firstName && userDetails.lastName && userDetails.email && userDetails.phone && userDetails.password && userDetails.confirmPassword && userDetails.qualification && userDetails.address && userDetails.aboutSelf)) {
            setErrMsg('Enter the required fields')
            window.scrollTo(0, 0);
        } else {
            Api.post('/checkUserExist', userDetails).then(() => {
            dispatch(set_user_details({
                user_details:{...userDetails,action:'signup'}
            }))
            navigate('/otpverification')
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

            <Container maxWidth="md">
                <div className='signupOutbox'>

                    <h3 className='signupHeading'>Build Your Career With Us</h3>
                    <h5>“The future depends on what you do today.”</h5>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <p className='errMsg'>{errMsg}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="First Name" name='firstName' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="Last Name" name='lastName' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" name='email' className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="Phone" name='phone' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" type="password" label="Password" name='password' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" type="password" label="Confirm Password" name='confirmPassword' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="Qualification" name='qualification' variant="outlined" className='signupTextbox' onChange={handleOnchange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Address"
                                multiline
                                name='address'
                                onChange={handleOnchange}
                                rows={3}
                                className='multiTextboxSignup'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Write about yourself.."
                                multiline
                                name='aboutSelf'
                                onChange={handleOnchange}
                                rows={3}
                                className='multiTextboxSignup'
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" className='loginBtn' sx={{ mt: 3, mb: 3 }} style={{ backgroundColor: "#CC747F" }} onClick={handleSubmit}>Register</Button><br />
                    <p className='alreadyhaveAccount'>Already have an account ? <u className='LoginInSignup' onClick={() => navigate('/login')}>Login</u></p>
                </div>
            </Container>
        </div>
    )
}

export default Signup
