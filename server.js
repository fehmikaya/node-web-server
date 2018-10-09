const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) console.log(err);
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Fehmi'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessagee: 'Unable to load'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});