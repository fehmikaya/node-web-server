const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');
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