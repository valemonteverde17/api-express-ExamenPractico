const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3500;
const app = express();
app.use(cookieParser());

function createCookies(req, res) {
    const agent = req.headers['user-agent'];
    res.cookie('Cookie', agent, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date("2024-02-29")
    });
}

function deleteCookies(res) {
    res.clearCookie("Cookie");
}

app.get('/', (req, res) => {
    createCookies(req, res);
    res.send('Cookie');
});

app.get('/eliminarcookies', (req, res) => {
    console.log(req.cookies);
    deleteCookies(res);
    res.send('Cookies eliminadas');
});

app.listen(port, () => {
    console.log('Escuchando puerto', port);
});
