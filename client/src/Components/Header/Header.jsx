import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'

import './Styles/Header.css'

function Header() {
    const navigate = useNavigate()
    const [mobileMenu, setMobileMenu] = useState(false)
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"
                    sx={{ backgroundColor: 'white' }}
                >
                    <Toolbar>

                        {
                            mobileMenu ?
                                <img src="\Images\icons8-close-67.png" alt="" className='menuIcon' onClick={() => setMobileMenu(!mobileMenu)} /> :
                                <img src="\Images\icons8-menu-120.png" alt="" className='menuIcon' onClick={() => setMobileMenu(!mobileMenu)} />
                        }

                        <img src="\Images\RundownLogo.png" alt="" className='Logo' onClick={() => navigate('/')} />

                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                        <Typography variant="h7" component="div" sx={{ flexGrow: 0.2 }} className='headertags' onClick={() => navigate('/')}>
                            Home
                        </Typography>
                        <Typography variant="h7" component="div" sx={{ flexGrow: 0.2 }} className='headertags' onClick={() => navigate('/assessmentInstruction')}>
                            Aptitude Test
                        </Typography>
                        <Typography variant="h7" component="div" sx={{ flexGrow: 0.2 }} className='headertags'>
                            Find Your Mentor
                        </Typography>
                        <Typography variant="h7" component="div" sx={{ flexGrow: 0.2 }} className='headertags'>
                            Be a Mentor
                        </Typography>
                        <Typography variant="h7" component="div" sx={{ flexGrow: 0.2 }} className='headertags' onClick={() => navigate('/messages')}>
                            Messages
                        </Typography>

                        <button className='loginbtn' onClick={() => navigate('/login')}>Login</button>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                mobileMenu ? <div className='MobileMenu'>

                    <p className='MobileHeaderTags' onClick={() => navigate('/')}>Home</p>
                    <p className='MobileHeaderTags' onClick={() => navigate('/assessmentInstruction')}>Aptitude Test</p>
                    <p className='MobileHeaderTags'>Find Your Mentor</p>
                    <p className='MobileHeaderTags'>Be a Mentor</p>
                    <p className='MobileHeaderTags'>Messages</p>

                </div> : ""
            }


        </div>
    )
}

export default Header
