import React, { useEffect, useState } from 'react'
import './Styles/Messages.css'
import Api from '../../Api/Api'

function Messages() {

  const [conversations, setConversations] = useState()
  const [user, setUser] = useState()
  const [mentor, setMentor] = useState()
  const [message, setMessage] = useState()
  const [refresh, setRefresh] = useState(false)
  const [oldMessages, setOldMessages] = useState([])
//  const messages = useGEtMessages()
  

  const sendMessage = () => {
    let messageObj = {
      conversationId: conversations,
      senderId: user,
      text: message
    }
    Api.post('/messages/addmessage', messageObj).then(() => {
      setRefresh(!refresh)
    }).catch((err) => {
      console.log(err);
    })
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
            <h4 className='chatName'>{mentor}</h4>
          </div>


        </div>
        <div className='rightBox'>
          <div className='messagesrightTop'>
            <h4 className='messagesHeadingRight'>{mentor}</h4>
          </div>
          <div className='messageContents'>

            {
              oldMessages.map((message) => {
                return (
                  <div className={message.senderId === user ? 'ourMessages' : 'receivedMessages'}>
                    <p className='messageText'>{message.text}</p>
                  </div>
                )
              })
            }
          </div>
          <div className='chatTextboxArea'>
            <input type="text" className='chatTextbox' onChange={(e) => setMessage(e.target.value)} />
            <img src="\Images\946722-middle-removebg-preview.png" alt="" className='sendButton' onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
