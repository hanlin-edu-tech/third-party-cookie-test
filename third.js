const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();

app.use(session({
    secret: 'eh-test-session',
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'none'
    }
}));

app.use(cors({
    origin: ['https://localhost:8080', 'https://127.0.0.1:8080'],
    credentials: true
}));

app.use(express.json());

app.get('/index.html', function (req, res) {
    res.send(`<!DOCTYPE html><html lang="zh-Hant-TW"><body><h3>${req.sessionID}</h3></body></html>`);
});

app.get('/session.json', function (req, res) {
    res.send({ id: req.sessionID });
});

const httpsServer = https.createServer({
    key: fs.readFileSync(`localhost+1-key.pem`),
    cert: fs.readFileSync(`localhost+1.pem`)
}, app);

httpsServer.listen(8181, () => console.log('Third listening on port 8181!'));