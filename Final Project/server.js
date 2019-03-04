var express = require('express');
const hbs = require('hbs');
var mongoose = require('mongoose');
//---------------------------------------------------------------

//initializing express
var app = express();
//setting view engine to hbs
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

//routing ---------------------------------------------------------------
app.all('/index',(req,res)=>{
    var qString = req.query.add;
    
   
//------ STUDENT SECTION 
    if(qString == 'student') {

        var fName = req.body.studFirstNameAdd;
        var lName = req.body.studLastNameAdd;
        var phone = req.body.studPhoneAdd;
        var email = req.body.studEmailAdd;
        var membership = req.body.studMemTypeAdd.selectedIndex;
        
        var newStudent = new Student();
        //collecting student info
        newStudent.firstName = req.body.studFirstNameAdd;
        newStudent.lastName = req.body.studLastNameAdd;
        newStudent.phoneNumber = req.body.studPhoneAdd;
        newStudent.email = req.body.studEmailAdd;
        newStudent.membershipType = req.body.studMemTypeAdd;
        //error message variables
        var errorFName = "";
        var errorLName = "";
        var errorPhone = "";
        var errorEmail = "";
        var errorMemType = "";


        try {
            const result =  newStudent.save(function (err) {
                 if (err) {
                     
                     if(typeof err.errors.firstName !== "undefined")
                    {
                        errorFName = err.errors.firstName.message;
                        console.log("ERROR LENGTH: " + err.errors.firstName.message)
                    } else {
                        console.log("ERRORSAL: " + errorFName);
                    }
                    if(typeof err.errors.lastName !== "undefined")
                    {
                        errorLName = err.errors.lastName.message;
                        console.log("ERRORFN: " + errorLName);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorLName);
                    }
                    if(typeof err.errors.phoneNumber !== "undefined")
                    {
                        errorPhone = err.errors.phoneNumber.message;;
                        console.log("ERRORFN: " + errorPhone);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorPhone);
                    }
                    if(typeof err.errors.email !== "undefined")
                    {
                        errorEmail = err.errors.email.message;
                        console.log("ERRORFN: " + errorEmail);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorEmail);
                    }
                    if(typeof err.errors.membershipType !== "undefined")
                    {
                        errorMemType = err.errors.membershipType.message;
                        console.log("ERRORFN: " + errorMemType);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorMemType);
                    }

                //return res.send(500, { error: err });
                  
                   res.render('index.hbs',{errorFName, errorLName, errorPhone, errorEmail, errorMemType, fName, lName, phone, email, membership});

                 } else {
                     var success = "Student succesfully added.";
                    res.render('index.hbs',{success});
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("index.hbs",{tryError});
         }//catch CLOSE

    }// if qString == 'student' CLOSE

    //------ INSTRUCTOR SECTION
    else if(qString == 'instructor') {
        var newInstructor = new Instructor();
    }//if qString == 'instructor' CLOSE

    //------ YOGACLASS SECTION
    else if(qString == 'class') {
        var newYogaClass = new YogaClass()

    }//if qString == 'class' CLOSE
    else {
        res.render("index.hbs");
    }
}); //route to index.hbs CLOSE

app.all('/view',(req,res)=>{
    res.render('view.hbs');
});//route to view.hbs CLOSE

app.all('/updateClass',(req,res)=>{
    res.render('updateClass.hbs');
});//route to updateClass.hbs CLOSE

app.all('/updateInstructor',(req,res)=>{
    res.render('updateInstructor.hbs');
});//route to updateInstructor.hbs CLOSE

app.all('/updateStudent',(req,res)=>{
    res.render('updateStudent.hbs');
});//route to updateStudent.hbs CLOSE 

//connecting to db ------------------------------------------------
var mongoClient = require("mongodb").MongoClient.connect;
var server = "mongodb://localhost:27017/Test";
mongoose.connect(server);
var connection = mongoose.connection;
connection.on('connected', function() {
    console.log('connected to db');
});
//schemas -----------------
var studentSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        required: [true, 'First name is required.']
        
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.']
        
    },
    phoneNumber: {
        type: String,
        validate: [/[0-9]/, 'Please enter valid numbers only.' ],
        required: [true, 'Phone number is required'],
        minlength: [10, 'Please enter a valid, 10 digit phone number.'],
        maxlength: [10, 'Please enter a valid, 10 digit phone number.']
    },
    email: {
        type:String,
        validate:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'This is not a valid email address.'],
        required:[true, 'Please enter an email address.']
    },
    membershipType: {
        type:String,
        required:[true, 'Please select membership type.']
    }

});

//STUDENT OBJECT
var Student = mongoose.model('student', studentSchema);

var classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: [true, 'Please enter a class name.']
    },
    difficulty: {
        type: String,
        validate: [/[1-7]/, 'Please enter valid numbers only.' ],
        reuired:[true, 'Please enter a level of difficulty (1 - 7).']
    },
    description: {
        type: String,
        minlength: [20, 'Be more descriptive!'],
        required: [true, 'Please enter a brief description.']
    }

});

//YOGACLASS OBJECT
var YogaClass = mongoose.model('yogaClass', classSchema);

var instructorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.']
        
    },
    lastName: {
        type: String,
        required: [true, 'First name is required.']
        
    },
    phoneNumber: {
        type: String,
        validate: [/[0-9]/, 'Please enter valid numbers only.' ],
        required: [true, 'Phone number is required'],
        minlength: [10, 'Please enter a valid, 10 digit phone number.'],
        maxlength: [10, 'Please enter a valid, 10 digit phone number.']
    },
    experience: {
        type: String,
        validate: [/[0-9]/, 'Please enter numeric value.' ],
        required: [true, 'Years of experience required.']
    },
    specialtyClass: {
        type: String,
        required: [true, 'Specialty class required.']
    }

});

//INSTRUCTOR OBJECT
var Instructor = mongoose.model('instructor', instructorSchema);


//---------------------------------------------------------------
//setting up server

app.listen(3000, () => {
    console.log('server is running on Port 3000');
});