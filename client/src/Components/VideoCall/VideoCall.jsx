import React from 'react'
import './Styles/VideoCall.css'

function VideoCall() {
    return (
        <div className='videoCallOuter'>
            <img src="\Images\disconnect-512.webp" alt="" className='disconnectBtn' />
            <div className='ourVideo'></div>
        </div>
    )
}

export default VideoCall
