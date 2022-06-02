import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { format } from 'timeago.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Api from '../../Api/Api'
import './Styles/Messages.css'
import { setMentorId } from '../../Redux/MentorId/mentorIdSlice'

function Messages() {

  const [conversations, setConversations] = useState()
  const [user, setUser] = useState()
  const [mentor, setMentor] = useState()
  const [message, setMessage] = useState()
  const [oldMessages, setOldMessages] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const socket = useRef()
  const scrollRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //  const messages = useGEtMessages() 

  useEffect(() => {
    socket.current = io("ws://localhost:8000")
    let rundownUser = JSON.parse(localStorage.getItem("RundownUser"))
    setUser(rundownUser._id)
    socket.current.emit("addUser", rundownUser._id)
    socket.current.on("getUsers", users => {
      console.log(users);
    })
    socket.current.on("getMessage", (data) => {
      setNewMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
      console.log(data.senderId);
    })

    Api.post('/conversations/getconversations', { userId: rundownUser._id }).then((response) => {
      setConversations(response.data.conversationId)
      setMentor(response.data.mentor)
      setOldMessages(response.data.messages)
    }).catch((err) => {
      console.log(err);
    })


  }, [])

  useEffect(() => {
    newMessage && newMessage.senderId !== user && setOldMessages(prev => [...prev, newMessage])
  }, [newMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [oldMessages])

  const sendMessage = () => {
    let messageObj = {
      conversationId: conversations,
      senderId: user,
      text: message,
      createdAt: Date.now()
    }
    setOldMessages(prev => [...prev, messageObj])
    setMessage('')
    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId: mentor._id,
      text: message
    })

    Api.post('/messages/addmessage', messageObj).then(() => {

    }).catch((err) => {
      console.log(err);
    })
  }

  const videoCallMentor = () => {
    dispatch(setMentorId({
      mentorId: mentor._id
    }))
    navigate('/videoCall')
  }
  return (
    <div>
      <div className='messagesOuterDiv'>
        <div className='leftBox'>
          <div className='messagesLeftTop'>
            <h4 className='messagesHeadingLeft'>Messages</h4>
          </div>
          <div className='chatPersons'>
            <img src="\Images\0x0.png" alt="" className='chatProfilePic' />
            {mentor ? <h4 className='chatName'>{mentor.firstName + " " + mentor.lastName}</h4> : ''}
          </div>
        </div>
        <div className='rightBox'>
          <div className='messagesrightTop'>
            {mentor ? <h4 className='messagesHeadingRight'>{mentor.firstName + " " + mentor.lastName}</h4> : ""}
            <img src="\Images\icons8-video-call-50.png" alt="" className='videoCallIcon' onClick={videoCallMentor} />
          </div>
          <div className='messageContents' ref={scrollRef}>

            {
              oldMessages.map((message) => {
                return (
                  <div>

                    <div className={message.senderId === user ? 'ourMessages' : 'receivedMessages'}>
                      <p className='messageText'>{message.text}</p>
                    </div>
                    <p className={message.senderId === user ? 'ourMessageTime' : 'receivedMessageTime'}>{format(message.createdAt)}</p>
                  </div>
                )
              })
            }
          </div>

          <div className='chatTextboxArea'>
            <input type="text" className='chatTextbox' value={message} onChange={(e) => setMessage(e.target.value)} />
            <img src="\Images\946722-middle-removebg-preview.png" alt="" className='sendButton' onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
