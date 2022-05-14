import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

import './Styles/AssessmentInstructions.css'

function AssessmentInstructions() {
    const navigate = useNavigate()
    return (
        <div>
            <Container maxWidth="md">
                <div style={{ textAlign: 'center' }}>
                    <h2 className='InstructionHeading'>Take Our Aptitude Test</h2>
                    <h5 className='InstructionTagline'>Discover yourself and your ideal career</h5>

                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <div style={{ display: 'flex' }}>
                                <h1 className='instructionNumber'>01</h1>
                                <p>Take the assessment with a calm, clear mind. Make sure you’re not distracted by anything or anyone!</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}>
                            <div style={{ display: 'flex' }}>
                                <h1 className='instructionNumber'>02</h1>
                                <p>Read every question carefully, and answer each one honestly. Remember - these answers will tell you who you are and which career you’re meant to pursue!</p>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div style={{ display: 'flex' }}>
                                <h1 className='instructionNumber'>03</h1>
                                <p>Try and take the whole assessment at once - avoid taking a break!</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>

                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}>
                            <div style={{ display: 'flex' }}>
                                <h1 className='instructionNumber'>04</h1>
                                <p>This assessment contains 3 categories of question and each category includes 10 questions.</p>
                            </div>
                        </Grid>
                    </Grid>
                    <Button variant="contained" className='GetStarted' sx={{ mt: 3, mb: 3 }} style={{ backgroundColor: "#CC747F" }}
                        onClick={() => navigate('/assessmentType')}>Get Started</Button><br />
                </div>
            </Container>
        </div>
    )
}

export default AssessmentInstructions
