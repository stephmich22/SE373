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

// //routing ---------------------------------------------------------------
app.all('/index',(req,res)=>{
    var qString = req.query.add;

    var allClasses = YogaClass.find(function (err, classes) {
        if (err) return res.send(500, { error: err });
        //console.log(classes);
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
                  
                   res.render('index.hbs',{errorFName, errorLName, errorPhone, errorEmail, errorMemType, fName, lName, phone, email, membership, classes});

                 } else {
                     var success = "Student succesfully added.";
                    res.render('index.hbs',{success, classes});
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("index.hbs",{tryError, classes});
         }//catch CLOSE

    }// if qString == 'student' CLOSE

    //------ INSTRUCTOR SECTION
    else if(qString == 'instructor') {

        
        var fNameInst = req.body.instFirstNameAdd;
        var lNameInst = req.body.instLastNameAdd;
        var phoneInst = req.body.instPhoneAdd;
        var YOE = req.body.instYOEAdd;
        var specClass = req.body.specialtyClass;
        
        var newInstructor = new Instructor();
        //collecting student info
        newInstructor.firstName = req.body.instFirstNameAdd;
        newInstructor.lastName = req.body.instLastNameAdd;
        newInstructor.phoneNumber = req.body.instPhoneAdd;
        newInstructor.experience = req.body.instYOEAdd;
        newInstructor.specialtyClass = req.body.specialtyClass;
        //error message variables
        var errorFNameInst = "";
        var errorLNameInst = "";
        var errorPhoneInst = "";
        var errorYOE = "";
        var errorSpec = "";


        try {
            const result =  newInstructor.save(function (err) {
                 if (err) {
                     
                     if(typeof err.errors.firstName !== "undefined")
                    {
                        errorFNameInst = err.errors.firstName.message;
                        console.log("ERROR LENGTH: " + err.errors.firstName.message)
                    } else {
                        console.log("ERRORSAL: " + errorFNameInst);
                    }
                    if(typeof err.errors.lastName !== "undefined")
                    {
                        errorLNameInst = err.errors.lastName.message;
                        console.log("ERRORFN: " + errorLNameInst);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorLNameInst);
                    }
                    if(typeof err.errors.phoneNumber !== "undefined")
                    {
                        errorPhoneInst = err.errors.phoneNumber.message;;
                        console.log("ERRORFN: " + errorPhoneInst);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorPhoneInst);
                    }
                    if(typeof err.errors.experience !== "undefined")
                    {
                        errorYOE = err.errors.experience.message;
                        console.log("ERRORFN: " + errorYOE);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorYOE);
                    }
                    if(typeof err.errors.specialtyClass !== "undefined")
                    {
                        errorSpec = err.errors.specialtyClass.message;
                        console.log("ERRORFN: " + errorSpec);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorSpec);
                    }

                //return res.send(500, { error: err });
                  
                   res.render('index.hbs',{errorFNameInst, errorLNameInst, errorPhoneInst, errorSpec, errorYOE, fNameInst, lNameInst, phoneInst, YOE, specClass, classes});

                 } else {
                     var successInst = "Instructor succesfully added.";
                    res.render('index.hbs',{successInst, classes});
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("index.hbs",{tryError, classes});
         }//catch CLOSE
    }//if qString == 'instructor' CLOSE

    //------ YOGACLASS SECTION
    else if(qString == 'class') {
       
        console.log("CLASS STRING")
        var className = req.body.classNameAdd;
        var classDiff = req.body.classDiffAdd;
        var classDesc = req.body.classDescAdd;
        
        var newYogaClass = new YogaClass()
        //collecting student info
        newYogaClass.className = req.body.classNameAdd;
        newYogaClass.difficulty = req.body.classDiffAdd;
        newYogaClass.description = req.body.classDescAdd;
        
        //error message variables
        var errorClassNameAdd = "";
        var errorClassDiffAdd = "";
        var errorDescAdd = "";
        
        try {
            const result =  newYogaClass.save(function (err) {
                 if (err) {
                     
                     if(typeof err.errors.className !== "undefined")
                    {
                        errorClassNameAdd = err.errors.className.message;
                        console.log("ERROR LENGTH: " + err.errors.className.message)
                    } else {
                        console.log("ERRORSAL: " + errorClassNameAdd);
                    }
                    if(typeof err.errors.difficulty !== "undefined")
                    {
                        errorClassDiffAdd = err.errors.difficulty.message;
                        console.log("ERRORFN: " + errorClassDiffAdd);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorClassDiffAdd);
                    }
                    if(typeof err.errors.description !== "undefined")
                    {
                        errorDescAdd = err.errors.description.message;;
                        console.log("ERRORFN: " + errorDescAdd);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorDescAdd);
                    }
                    
                //return res.send(500, { error: err });
                  
                   res.render('index.hbs',{errorClassDiffAdd, errorDescAdd, errorClassNameAdd, className, classDiff, classDesc, classes});

                 } else {
                     var successClass = "Class succesfully added.";
                    res.render('index.hbs',{successClass, classes});
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("index.hbs",{tryError, classes});
         }//catch CLOSE

    }//if qString == 'class' CLOSE
    else {
        res.render("index.hbs", {classes});
    }
    
   });//classes CLOSE
}); //route to index.hbs CLOSE

app.all('/view',(req,res)=>{
  
    var qString = req.query.table;
    var qStringAction = req.query.do;
    var id = req.query.id;

    if(qString == 'student') {

        var allStudents = Student.find(function (err, students) {

             res.render("view.hbs",{ students, title:"All Students", getStuds:true});
        });//allStudents CLOSE
        
    }//if student CLOSE
    else if(qString == 'instructor') {

        var allInstructors = Instructor.find(function (err, instructors) {
            res.render("view.hbs",{ instructors, title:"All Instructors", getInst:true});
       });//allInstructors CLOSE

    } else if(qString == 'class') {

        var allClasses = YogaClass.find(function (err, classes) {
             res.render("view.hbs",{ classes, title:"All Classes", getClasses: true});
        });//allClasses CLOSE

    }//else CLOSE 
    else {
    //--------------------- actions, DELETE

    if(qStringAction == 'deletestudent') {
        Student.findByIdAndRemove(id, function(err, doc){
            if (err) return res.send(500, { error: err });
            var allStudents = Student.find(function (err, students) {

                res.render("view.hbs",{ students, title:"All Students", getStuds:true});
           });//allStudents CLOSE
        });
    }//student CLOSE
    else if(qStringAction == 'deleteinstructor') {
        Instructor.findByIdAndRemove(id, function(err, doc){
            if (err) return res.send(500, { error: err });
            var allInstructors = Instructor.find(function (err, instructors) {
                res.render("view.hbs",{ instructors, title:"All Instructors", getInst:true});
           });//allInstructors CLOSE
        });
    }//instructor CLOSE
    else if(qStringAction == 'deleteclass'){
        YogaClass.findByIdAndRemove(id, function(err, doc){
            if (err) return res.send(500, { error: err });
            var allClasses = YogaClass.find(function (err, classes) {
                res.render("view.hbs",{ classes, title:"All Classes", getClasses: true});
           });//allClasses CLOSE
        });
    }//else yogaClass CLOSE

}//else qstring not table

  //  res.render('view.hbs');
});//route to view.hbs CLOSE

app.all('/updateClass',(req,res)=>{

    var qStringID = req.query.id;
    var qStringUpdate = req.query.update;

    if(qStringUpdate == 't') {

    var className = req.body.classNameAdd;
        var classDiff = req.body.classDiffAdd;
        var classDesc = req.body.classDescAdd;
        
        var newYogaClass = new YogaClass()
        //collecting student info
        newYogaClass.className = req.body.classNameAdd;
        newYogaClass.difficulty = req.body.classDiffAdd;
        newYogaClass.description = req.body.classDescAdd;
        
        //error message variables
        var errorClassNameAdd = "";
        var errorClassDiffAdd = "";
        var errorDescAdd = "";

        var classes = "";

        var upsertData = newYogaClass.toObject();
        delete upsertData._id;
        
        try {
            const result =  YogaClass.update({_id:qStringID}, upsertData,{ runValidators: true }, function (err, doc) {
                 if (err) {
                     
                     if(typeof err.errors.className !== "undefined")
                    {
                        errorClassNameAdd = err.errors.className.message;
                        console.log("ERROR LENGTH: " + err.errors.className.message)
                    } else {
                        console.log("ERRORSAL: " + errorClassNameAdd);
                    }
                    if(typeof err.errors.difficulty !== "undefined")
                    {
                        errorClassDiffAdd = err.errors.difficulty.message;
                        console.log("ERRORFN: " + errorClassDiffAdd);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorClassDiffAdd);
                    }
                    if(typeof err.errors.description !== "undefined")
                    {
                        errorDescAdd = err.errors.description.message;;
                        console.log("ERRORFN: " + errorDescAdd);
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorDescAdd);
                    }
                    
                //return res.send(500, { error: err });
                  
                   res.render('updateClass.hbs',{errorClassDiffAdd, errorDescAdd, errorClassNameAdd, className, classDiff, classDesc, classes, qStringID});

                 } else {

                    var success = "Class succesfully added.";
                    var allClasses = YogaClass.find(function (err, classes) {
                        res.render("view.hbs",{ classes, title:"All Classes", getClasses: true, success});
                   });//allClasses CLOSE
                     
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("index.hbs",{tryError, classes});
         }//catch CLOSE

        } else {
            var id = req.body.hiddenID;
         console.log(id);
         studentToUpdate = YogaClass.findOne({ _id: id}, function (err, yogaClass) {
            if (err) return console.error(err);
            console.log("THIS IS THE EMPLOYEE TO UPDATE" + yogaClass.className);
    
            res.render('updateClass.hbs', {ID:req.body.hiddenID, className:yogaClass.className, classDiff:yogaClass.difficulty, classDesc:yogaClass.description});
        });
        }

});//route to updateClass.hbs CLOSE

app.all('/updateInstructor',(req,res)=>{

    var qStringID = req.query.id;
    var qStringUpdate = req.query.update;
    var allClasses = YogaClass.find(function (err, classes) {
        if (err) return res.send(500, { error: err });

    
    var instructorToUpdate = new Instructor();
   
    

    if(qStringUpdate == 't') {
        console.log(id)
    var fNameInst = req.body.instFirstNameAdd;
    var lNameInst = req.body.instLastNameAdd;
    var phoneInst = req.body.instPhoneAdd;
    var YOE = req.body.instYOEAdd;
    var specClass = req.body.specialtyClass;
    
    var newInstructor = new Instructor();
    //collecting student info
    newInstructor.firstName = req.body.instFirstNameAdd;
    newInstructor.lastName = req.body.instLastNameAdd;
    newInstructor.phoneNumber = req.body.instPhoneAdd;
    newInstructor.experience = req.body.instYOEAdd;
    newInstructor.specialtyClass = req.body.specialtyClass;
    //error message variables
    var errorFNameInst = "";
    var errorLNameInst = "";
    var errorPhoneInst = "";
    var errorYOE = "";
    var errorSpec = "";

    
    var upsertData = newInstructor.toObject();
    delete upsertData._id;

    try {
        const result =  Instructor.update({_id:qStringID}, upsertData,{ runValidators: true }, function (err, doc) {
             if (err) {
                 
                 if(typeof err.errors.firstName !== "undefined")
                {
                    errorFNameInst = err.errors.firstName.message;
                    console.log("ERROR LENGTH: " + err.errors.firstName.message)
                } else {
                    console.log("ERRORSAL: " + errorFNameInst);
                }
                if(typeof err.errors.lastName !== "undefined")
                {
                    errorLNameInst = err.errors.lastName.message;
                    console.log("ERRORFN: " + errorLNameInst);
                } 
                else {
                    
                    console.log("ERRORFN: " + errorLNameInst);
                }
                if(typeof err.errors.phoneNumber !== "undefined")
                {
                    errorPhoneInst = err.errors.phoneNumber.message;;
                    console.log("ERRORFN: " + errorPhoneInst);
                } 
                else {
                    
                    console.log("ERRORFN: " + errorPhoneInst);
                }
                if(typeof err.errors.experience !== "undefined")
                {
                    errorYOE = err.errors.experience.message;
                    console.log("ERRORFN: " + errorYOE);
                } 
                else {
                    
                    console.log("ERRORFN: " + errorYOE);
                }
                if(typeof err.errors.specialtyClass !== "undefined")
                {
                    errorSpec = err.errors.specialtyClass.message;
                    console.log("ERRORFN: " + errorSpec);
                } 
                else {
                    
                    console.log("ERRORFN: " + errorSpec);
                }

            //return res.send(500, { error: err });
              
               res.render('updateInstructor.hbs',{errorFNameInst, errorLNameInst, errorPhoneInst, errorSpec, errorYOE, fNameInst, lNameInst, phoneInst, YOE, specClass, classes, qStringID});

             } else {
                var allInstructors = Instructor.find(function (err, instructors) {
                    var success = "Instructor succesfully added.";
                    res.render("view.hbs",{ instructors, title:"All Instructors", getInst:true, success});
               });//allInstructors CLOSE

             }//else CLOSE

           });
             console.log("TRY RESULT: " + result)
     }catch(tryError) {
         
         res.render("index.hbs",{tryError, classes});
     }//catch CLOSE

    } else {
        
        var id = req.body.hiddenID;
         console.log("HERE");
         instructorToUpdate = Instructor.findOne({ _id: id}, function (err, instructor) {
            if (err) return console.error(err);
            console.log("THIS IS THE EMPLOYEE TO UPDATE" + instructor.firstName);
    
            res.render('updateInstructor.hbs', {ID:req.body.hiddenID, fNameInst:instructor.firstName, lNameInst:instructor.lastName, phoneInst:instructor.phoneNumber, YOE:instructor.experience, specClass:instructor.specialtyClass, classes});
        });

    }// else CLOSE
    }); //getting classes CLOSE
});//route to updateInstructor.hbs CLOSE

app.all('/updateStudent',(req,res)=>{

    var qStringID = req.query.id;
    var qStringUpdate = req.query.update;
    var studentToUpdate = new Student();
    var thisTrue = true;
    if(qStringUpdate == 't') {
        
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

        var classes = "";

        var upsertData = newStudent.toObject();
        delete upsertData._id;

        

        try {
            console.log("inside function")
           const result =  Student.update({_id:qStringID}, upsertData,{ runValidators: true }, function (err, doc) {
                 if (err) {
                     console.log(err);
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
                  
                   res.render('updateStudent.hbs',{errorFName, errorLName, errorPhone, errorEmail, errorMemType, fName, lName, phone, email, membership, classes, qStringID, thisTrue});

                 } else {
                     console.log("ji")
                     var allStudents = Student.find(function (err, students) {
                        var success = "Student succesfully updated.";
                        res.render("view.hbs",{ students, title:"All Students", getStuds:true, success});
                   });//allStudents CLOSE
                     
                 }
                });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             
             res.render("updateStudent.hbs",{tryError, classes});
         }//catch CLOSE
         
    } else {
    
         var id = req.body.hiddenID;
         console.log(id);
         studentToUpdate = Student.findOne({ _id: id}, function (err, student) {
            if (err) return console.error(err);
            console.log("THIS IS THE EMPLOYEE TO UPDATE" + student.firstName);
    
            res.render('updateStudent.hbs', {ID:req.body.hiddenID, fName:student.firstName, lName:student.lastName, phone:student.phoneNumber, email:student.email, membership:student.membershipType, thisTrue});
        });
    }
});//route to updateStudent.hbs CLOSE 

app.all('/delete',(req,res)=> {
    var qString = req.query.type;
    var id = req.body.hiddenID;

    if(qString == 'student') {
        var studentToDelete = new Student();

        studentToDelete = Student.findOne({ _id: id}, function(err, student) {
            if (err) return console.error(err);
            
            res.render('delete.hbs', {ID:id, fName:student.firstName, lName:student.lastName, phone:student.phoneNumber, isStudent:true, title:'student'});

        });//studentToDelete CLOSE

    } else if(qString == 'instructor') {
        var instuctorToDelete = new Instructor();

        instuctorToDelete = Instructor.findOne({ _id: id}, function(err, instructor) {
            if (err) return console.error(err);
            
            res.render('delete.hbs', {ID:id, fName:instructor.firstName, lName:instructor.lastName, isInstructor:true, title:'instructor'});

        });//instuctorToDelete CLOSE

    } else {
        var classToDelete = new YogaClass();

        classToDelete = YogaClass.findOne({ _id: id}, function(err, yogaClass) {
            if (err) return console.error(err);
            
            res.render('delete.hbs', {ID:id, className:yogaClass.className, isClass:true, title:'class' });

        });//instuctorToDelete CLOSE
    }

});//route to delete CLOSE



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
        validate: [/[1-7]/, 'Please enter a number between 1 and 7.' ],
        maxlength:[1, 'Please enter a number between 1 and 7.'],
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
        required: [true, 'Last name is required.']
        
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


//------------------------------ HELPERS
hbs.registerHelper('getAllStudents', ( students) => {
    // console.log("STUDENTS: " + students)
    var table = "<table class='table table-striped table-bordered'>";
    table += "<tr>";
    table += "<th>First Name</th>";
    table += "<th>Last Name</th>";
    table += "<th>Phone Number</th>";
    table += "<th>Email</th>";
    table += "<th>Membership Type</th>";
    table += "<th>Edit</th>";
    table += "</tr>";

    for(var i = 0; i < students.length; i++) {
       
        table += `<tr>`;
        table += `<td>${students[i].firstName}</td>`;
        table += `<td>${students[i].lastName}</td>`;
        table += `<td>${students[i].phoneNumber}</td>`;
        table += `<td>${students[i].email}</td>`;
        table += `<td>${students[i].membershipType}</td>`;
        table += `<td><form action='/updateStudent' method='POST'><input type='hidden' name='hiddenID' value=${students[i]._id}><input type='submit'name='btnUpdate' value='Update' class='btn-primary table' /></form><form action='/delete?type=student' method='POST'><input type='hidden' name='hiddenID' value=${students[i]._id}><input type='submit'name='btnDelete' value='Delete' class='btn-dark table' /></form></td>`;   
        table += `</tr>`;

    }
    table += "</table>";

    return table;
});//getAllStudents CLOSE

hbs.registerHelper('getAllInstuctors', (instructors) => {
    // console.log("STUDENTS: " + students)
    var table = "<table class='table table-striped table-bordered'>";
    table += "<tr>";
    table += "<th>First Name</th>";
    table += "<th>Last Name</th>";
    table += "<th>Phone Number</th>";
    table += "<th>Years of Experience</th>";
    table += "<th>Specialty Class</th>";
    table += "<th>Edit</th>";
    table += "</tr>";

    for(var i = 0; i < instructors.length; i++) {
       
        table += `<tr>`;
        table += `<td>${instructors[i].firstName}</td>`;
        table += `<td>${instructors[i].lastName}</td>`;
        table += `<td>${instructors[i].phoneNumber}</td>`;
        table += `<td>${instructors[i].experience}</td>`;
        table += `<td>${instructors[i].specialtyClass}</td>`;
        table += `<td><form action='/updateInstructor' method='POST'><input type='hidden' name='hiddenID' value=${instructors[i]._id}><input type='submit'name='btnUpdate' value='Update' class='btn-primary table' /></form><form action='/delete?type=instructor' method='POST'><input type='hidden' name='hiddenID' value=${instructors[i]._id}><input type='submit'name='btnDelete' value='Delete' class='btn-dark table' /></form></td>`;   
        table += `</tr>`;

    }
    table += "</table>";

    return table;
});//getAllInstructors CLOSE

hbs.registerHelper('getAllClasses', (classes) => {
    // console.log("STUDENTS: " + students)
    var table = "<table class='table table-striped table-bordered'>";
    table += "<tr>";
    table += "<th>Class Name</th>";
    table += "<th>Difficulty</th>";
    table += "<th>Description</th>";
    table += "<th>Edit</th>";
    table += "</tr>";

    for(var i = 0; i < classes.length; i++) {
       
        table += `<tr>`;
        table += `<td>${classes[i].className}</td>`;
        table += `<td>${classes[i].difficulty}</td>`;
        table += `<td>${classes[i].description}</td>`;
        table += `<td><form action='/updateClass' method='POST'><input type='hidden' name='hiddenID' value=${classes[i]._id}><input type='submit'name='btnUpdate' value='Update' class='btn-primary table' /></form><form action='/delete?type=class?' method='POST'><input type='hidden' name='hiddenID' value=${classes[i]._id}><input type='submit' name='btnDelete' value='Delete' class='btn-dark table' /></form></td>`;   
        table += `</tr>`;

    }
    table += "</table>";

    return table;
});//getAllClasses CLOSE

hbs.registerHelper('getAllClassOptions',(allClasses) => {
    
   var options = "";
   
   for(var i = 0; i < allClasses.length; i++) {
        options += `<option>${allClasses[i].className}</option>`;
   }//for CLOSE
   
   return options;
 });//getAllClassOptions



//---------------------------------------------------------------
//setting up server

app.listen(3000, () => {
    console.log('server is running on Port 3000');
});