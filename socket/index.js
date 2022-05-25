const io = require('socket.io')(8000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

//connect
io.on("connection", (socket) => {
    console.log("a user connected");

    //taking userId and socketId
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and get messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const receiver = getUser(receiverId)
        const sender = getUser(senderId)
        if (receiver) {
            io.to(receiver.socketId).emit('getMessage', {
                senderId,
                text
            })
            io.to(sender.socketId).emit('getMessage', {
                senderId,
                text
            })
        }
    })

    //disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id)
    })
})