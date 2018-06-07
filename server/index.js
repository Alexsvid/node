var wss = require("ws").Server;

var server = new wss({port : 591});

var clients = new Set();
server.on("connection", function(socket) {
    clients.add(socket);

    socket.on("message", function(message) {
        for(var inter of clients) {
            inter.send(message);
        }
    });

    socket.on("close", function ( ){
        clients.delete(socket);
    });
});
