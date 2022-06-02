import React, { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import './Styles/VideoCall.css'
import { Button } from '@mui/material'

function VideoCall() {
    const socket = useRef()
    const [me, setMe] = useState()
    const [stream, setStream] = useState()
    const [caller, setCaller] = useState()
    const [callerSignal, setCallerSignal] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [callAccepted, setCallAccepted] = useState()
    const [idToCall, setIdToCall] = useState()
    const [callEnded, setCallEnded] = useState()
    const [name, setName] = useState()

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const mentorId = useSelector(state => state.mentorId.value)

    useEffect(() => {
        socket.current = io("ws://localhost:8000")
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setCallerSignal(data.signal)
            // setName(data.name)
        })

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: mentorId,
                signalData: data,
                from: me,
                // name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer

    }, [])

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })

        peer.on("stream" ,  (stream)=>{
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = ()=>{
        setCallEnded(true)
        connectionRef.current.destroy()
    }
    return (
        <div >
            {receivingCall && !callAccepted && <Button variant="contained" onClick={answerCall}>Answer Call</Button>}
            {callAccepted && !callEnded && <video className='videoCallOuter' playsInline autoPlay ref={userVideo} />}
            <img src="\Images\disconnect-512.webp" alt="" className='disconnectBtn' />
           
                {stream && <video className='ourVideo' playsInline muted ref={myVideo} autoPlay />}
         
        </div>
    )
}

export default VideoCall
