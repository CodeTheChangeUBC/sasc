//const socketHandler = require("./../socket_server/socket");
const io = require("socket.io")();

io.on("connection", function (socket) {
    const username = socket.handshake.query.username;
    console.log(`${username} connected`);

    socket.on('client:message', data => {
        console.log(`${data.username}: ${data.message}`);

        socket.emit('server:message', data);

    });

    socket.on('disconnect', () => {
        console.log(`${username} disconnected`);
    });
});
