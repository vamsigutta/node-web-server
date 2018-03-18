const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var logData = `${now}: ${req.method} ${req.path}`;
    fs.appendFile('server.log',logData + '\n',(err) => {
        if (err){
            console.log("Unable to append the file");
        }
    }); 
    console.log();
    next();
});

app.use((req,res,next) => {
    res.render('maintainance.hbs');
});

hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/',(req, res) => {
    res.render('root.hbs',{
        pageTitle: "Welcome Page",
        welcomeText: "Welcome to node page"
    });
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle : "About Page",
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: "This is an error Message"
    });
});

app.listen(3000);