var express = require('express'); //can use vars or constant
const hbs = require('hbs')

//initializing express
var app = express();
//setting view engine to handlebars
app.set('view engine', 'hbs');
//registering partials
hbs.registerPartials(__dirname + '/views/partials');
//setting up static route, setting that to public folder
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false})); //when set to false it just means you cannot send an object with a property that is another object

function rando() {
    return Math.round(Math.random()*4 + 1);
}

//this is for the helper stuff
hbs.registerHelper('ptag', (num, messagePassedIn)=>{ //passing a number and message (this isn't built in or anything, we chose these this is like a regular function)
    var msg='';
    for(let i = 0; i < num; i++) //by using let, it makes i a var thats only accessible in this for loop, javascript weird thing
    {
        msg+=`<p>${messagePassedIn}</p>`;
    }

    return msg;
}); //see error.hbs for what's in btwn the p tags, we call this function there

//middleware
/*app.use((req,res,next) => {
    let date = new Date();
    console.log(date);
    next(); //if we do not call the next function, it will just stay here
})*/
//this is the same as the function above just written differently
//app.use(dateLogger);
function dateLogger(req,res,next){
    let date = new Date();
    console.log(date);
    req.date = date;
    next();
}

//the first line below is the original line
//app.get('/', (req, res) =>
app.get('/', dateLogger, (req, res) => { //notice how we can just call the dateLogger function in the middle, hence the name middleware
    console.log("words" + req.date);
}); //posts and gets always have a request and response objects

app.get('/form',(req,res)=>{
    res.render('form.hbs');
}) //this brings us to form page

//this is taking what we type in the textbox and putting it on the results page
app.post('/results',(req,res)=>{ //notice this is post not get
    res.render('results.hbs',{
        numberFromForm:Number(req.body.txtNumber) //passing in as an object and parsing it as a number so it isn't a string
    })
})

app.use((req,res,next)=>{
    const error = new Error('Page not found.'); //error is built in javascript object
    error.status = 404;
    next(error); //passing error to the next middleware function, further down
});
app.use((error,req,res,next)=>{

    res.status(error.status || 500); // saying its gonna be the error.status or its gonna give a generic message meaning its a network error (something out of our control)
    res.render('error.hbs', {
        message:`${error.status} ${error.message}`, //see error.hbs
        num:rando() //this is saying the word num represents calling the function called rando that we made on this page up above
    }); //redirecting to error page
     

})

/*app.get('*', (req, res)=> { //the star means for anything that isn't listed above it, that is why we put this last (last thing before the server function or maybe just the last 'get'? idk)
    res.render("error.hbs");
});*/

//setting up server
app.listen(3000, () => {
    console.log('server is running on Port 3000');
});

// above is all shit that is required for this to work