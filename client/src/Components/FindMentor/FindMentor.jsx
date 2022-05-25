import React from 'react'
import Button from '@mui/material/Button';
import './Styles/FindMentor.css'

function FindMentor() {
    return (
        <div>
            <div className='MentorOutbox'>
                <div className='MentorPhotoOuterDiv'>
                    <img src="\Images\mentorSample.jpg" alt="" className='MentorPhoto' />
                    <img src="\Images\videoCall.png" alt="" className='videocallLogo' />
                </div>
                <div className='MentorNameDiv'>
                    <h5 className='MentorName'>William Henry Gates</h5>
                </div>
                <div className='MentorDetailsDiv'>
                    <p className='MentorDetails'>Location :  Seattle, Washington, U.S.</p>
                    <p className='MentorDetails'>Education	Harvard University (dropped out)</p>
                    <p className='MentorDetails'>Occupation :  Software developer , investor, entrepreneur</p>
                    <p className='MentorDetails'>Years active :	1972 - present</p>
                </div>
                <div className='FindMentorBtns'>
                    <Button variant="contained" className='FindMentorBtn' sx={{ m: 'auto', mt: 3, mb: 4, fontSize: 11 }} style={{ backgroundColor: "#CC747F" }}>Change Mentor</Button>
                    <Button variant="contained" className='FindMentorBtn' sx={{ m: 'auto', mt: 3, mb: 4, fontSize: 11 }} style={{ backgroundColor: "#CC747F" }}>Message</Button>
                </div>
            </div>
        </div>
    )
}

export default FindMentor
