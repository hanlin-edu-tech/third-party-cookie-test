const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/main.html");
})

const httpsServer = https.createServer({
    key: fs.readFileSync(`localhost+1-key.pem`),
    cert: fs.readFileSync(`localhost+1.pem`)
}, app);

httpsServer.listen(8080, () => console.log('Main listening on port 8080!'));
