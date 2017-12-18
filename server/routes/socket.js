//const socketHandler = require("./../socket_server/socket");
const io = require("socket.io")();
console.log("inside routes/socket.js")
/*
io.on("connection", function (socket) {
    //const username = socket.handshake.query.username;
    //console.log(`${username} connected`);
    console.log("socket.js connected")

    socket.on('client:message', data => {
        //console.log(`${data.username}: ${data.message}`);
        console.log("received message")

        console.log(data);

        socket.emit('server:message', data);
        console.log("sent a message")

    });

    socket.on('disconnect', () => {
        //console.log(`${username} disconnected`);
        console.log("disconnected")
    });
});
*/