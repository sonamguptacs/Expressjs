const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//index.html
app.get('/', function (req, res) {
    const stream = fs.createReadStream('./index.html');
    stream.on('error', function (err) {
        res.json(400, { error: err.message });
    });
    stream.pipe(res);
})

server.listen(3000,()=>console.log('listening on port 3000'))
//sockets

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on("message", function (msg) {
        socket.emit('message', msg + 'you are connected');
    })
})
