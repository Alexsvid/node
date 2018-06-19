var wss = require("ws").Server;

var server = new wss({port : 591});

var clients = new Set();
var messages = [];

var fs = require("fs");
fs.readFile("messages.txt", {flag:"a+"}, function(err, content) {
    content;
    console.log(content.toString());
    messages.push(content.toLocaleString());

});

server.on("connection", function(socket) {
    clients.add(socket);
    for(var m of messages) {
        socket.send(m);
    }

    socket.on("message", function(message) {
        messages.push(message);

        s ="";
        for(var m of messages) {
            s = m+ '\n' + s;
        }
        fs.writeFile("messages.txt",  s);


        for(var inter of clients) {
            inter.send(message);
        }
    });

    socket.on("close", function ( ){
        clients.delete(socket);
    });
});
