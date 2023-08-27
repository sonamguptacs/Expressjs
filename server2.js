const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors:{origin:'*'}
});

//index.html
app.get('/', function (req, res) {
    const stream = fs.createReadStream('./index.html');
    stream.on('error', function (err) {
        res.json(400, { error: err.message });
    });
    stream.pipe(res);
})

//sockets
io.on('connection', function (client) {
    console.log('connected');
    client.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
    })
})

server.listen(3000,()=>console.log('listening on port 3000'))