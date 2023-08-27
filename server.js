const express = require('express');
const app = express();

app.listen(1337);

app.get('/*', function (req, res) {
    res.send(200,'hello world')
})


