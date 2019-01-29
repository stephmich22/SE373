var express = require("express");
var app = express(); //THIS IS GETTING THE EXPRESS FUNCTION FROM THE EXPRESS LIBRARY. this is the express object
var hbs = require('hbs'); //THIS IS TO USE HANDLEBARS
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.urlencoded()); //this is to be able to use the POST data
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{ //'/' is going to root directory
    //res.send('<h2>Hello World!</h2>'); //saying the response is going to display "Hello World!"
    res.render('index.hbs');//telling it to render index, passing it an object that we're just making up rn it doesnt matter
    //routing
});
app.get('/index', (req, res)=>{ //'/' is going to root directory
    //res.send('<h2>Hello World!</h2>'); //saying the response is going to display "Hello World!"
    res.render('index.hbs');//telling it to render index, passing it an object that we're just making up rn it doesnt matter
    //routing
});
app.get('/about', (req, res)=>{ //'/' is going to root directory
    //res.send('<h2>Hello World!</h2>'); //saying the response is going to display "Hello World!"
    res.render('about.hbs');//telling it to render index, passing it an object that we're just making up rn it doesnt matter
    //routing
});
app.get('/form', (req, res)=>{ //'/' is going to root directory
    //res.send('<h2>Hello World!</h2>'); //saying the response is going to display "Hello World!"
    res.render('form.hbs');//telling it to render index, passing it an object that we're just making up rn it doesnt matter
    //routing
});
app.all('/results', (req, res)=>{ //'/' is going to root directory
    //res.send('<h2>Hello World!</h2>'); //saying the response is going to display "Hello World!"
    res.render('results.hbs', {userName:req.body.nameInput, email:req.body.email, comments:req.body.comments});//telling it to render index, passing it an object that we're just making up rn it doesnt matter
    //routing
});

app.listen(3000, ()=> {
    console.log('Server is up at localhost:3000'); //saying when its up console log this
});