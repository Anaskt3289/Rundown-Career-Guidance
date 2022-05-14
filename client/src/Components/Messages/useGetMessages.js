useEffect(() => {
    let rundownUser = JSON.parse(localStorage.getItem("RundownUser"))
    setUser(rundownUser._id)
    Api.post('/conversations/getconversations', { userId: rundownUser._id }).then((response) => {
      let conversationId = response.data._id
      setConversations(response.data._id)
      Api.post('/mentor/findMentor', { mentorId: response.data.mentorId }).then((response) => {
        setMentor(response.data.firstName + " " + response.data.lastName)
        Api.post('/messages/getMessages', { conversationId: conversationId }).then((response) => {
          console.log(response.data);
          setOldMessages(response.data)
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }, [])