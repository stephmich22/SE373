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

//routing -------------------------------------------------------

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

app.all('/index',(req,res)=>{
    var qString = req.query.add;

    if(qString == 'true') {
        
        var d = new Date(req.body.startDateAdd);
       
        console.log("INPUT DATE: " + Number(d.getUTCMonth()) + 1 + "-" + Number(d.getUTCDay()) + 1 + "-" + d.getUTCFullYear());

        var newEmployee = new Employee();
    newEmployee.firstName = req.body.firstNameAdd;
    newEmployee.lastName = req.body.lastNameAdd;
    newEmployee.department = req.body.departmentDDLAdd;
    newEmployee.jobTitle = req.body.jobTitleAdd;
    newEmployee.startDate = req.body.startDateAdd;
    newEmployee.salary = req.body.salaryAdd;


    var errorSal = ""
     var errorFN = ""
        try {
            const result =  newEmployee.save(function (err) {
                 if (err) {
                     
                      
                     if(typeof err.errors.salary !== "undefined")
                    {

                        errorSal = err.errors.salary.message;
                        console.log("ERROR LENGTH: " + err.errors.salary.message)
                    } else {
                        console.log("ERRORSAL: " + errorSal)
                    }
                    if(typeof err.errors.firstName !== "undefined")
                    {
                        errorFN = err.errors.firstName.message;
                        console.log("ERRORFN: " + errorFN)
                    } 
                    else {
                        
                        console.log("ERRORFN: " + errorFN)
                    }
                //return res.send(500, { error: err });
                  
                   res.render('index.hbs',{errorFN, errorSal})
                 } else {
                     var success = "Employee succesfully added. <input type='submit'>"
                    res.render('index.hbs',{success})
                 }
               });
                 console.log("TRY RESULT: " + result)
         }catch(tryError) {
             console.log("TRY ERROR: " + tryError);
             res.render("index.hbs",{tryError});
         }
    } else {
        res.render("index.hbs");
    }
    
}); //this brings us to form page

app.use('/update',(req,res)=>{
    var employeeToUpdate = new Employee();
//*********************** THIS IS WHERE YOU LEFT OFF, JUST FILL IN TEXTT BOXES WITH INFO */
     var id = req.body.hiddenID;
     console.log(id)
    employeeToUpdate = Employee.findOne({ _id: id}, function (err, employee) {
        if (err) return console.error(err);
        console.log("THIS IS THE EMPLOYEE TO UPDATE" + employee.firstName);

        // for(var i = 0; i < employee.length; i++) {
        //     console.log(employee[i].firstName);
        // }
        res.render('update.hbs', {ID:req.body.hiddenID, firstName:employee.firstName, lastName:employee.lastName, department:employee.department, startDate:employee.startDate, jobTitle:employee.jobTitle, salary:employee.salary});
    });
    
    
}); //this brings us to form page

app.use('/delete',(req,res)=>{
    var employeeToDelete = new Employee();
//*********************** THIS IS WHERE YOU LEFT OFF, JUST FILL IN TEXTT BOXES WITH INFO */
     var id = req.body.hiddenID;
     console.log(id)
     employeeToDelete = Employee.findOne({ _id: id}, function (err, employee) {
        if (err) return console.error(err);
        console.log("THIS IS THE EMPLOYEE TO DELETE" + employee.firstName);

        // for(var i = 0; i < employee.length; i++) {
        //     console.log(employee[i].firstName);
        // }
        res.render('delete.hbs', {ID:req.body.hiddenID, firstName:employee.firstName, lastName:employee.lastName, department:employee.department, startDate:employee.startDate, jobTitle:employee.jobTitle, salary:employee.salary});
    });
}); //this brings us to form page

app.all('/view',(req,res)=>{


var qString = req.query.employee;
console.log(qString + "_------*&*$#&*%&#&*%&#&*^$&^*$");

if(qString == 'true') {
   
    var newEmployee = new Employee();
    newEmployee.firstName = req.body.firstNameAdd;
    newEmployee.lastName = req.body.lastNameAdd;
    newEmployee.department = req.body.departmentDDLAdd;
    newEmployee.jobTitle = req.body.jobTitleAdd;
    newEmployee.startDate = req.body.startDateAdd;
    newEmployee.salary = req.body.salaryAdd;
  
    // try {
    //    const result =  newEmployee.save(function (err) {
    //         if (err) return res.send(500, { error: err });
    //           var allEmployees = Employee.find(function (err, employees) {
    //             if (err) return console.error(err);
    //             res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
    //           });
    //       });
    //         console.log("TRY RESULT: " + result)
    // }catch(tryError) {
    //     console.log("TRY ERROR: " + tryError);
    //     res.render("index.hbs",{tryError});
    // }
  
  
}
 if(qString == 'update') {
  console.log(qString + "fkankdngknkjdsvdnvjndsjkndksnjdsjdsj")
    var id = req.query.id;
    //console.log(id);

    var newEmployee = new Employee();
    newEmployee.firstName = req.body.firstNameUpdate;
    newEmployee.lastName = req.body.lastNameUpdate;
    newEmployee.department = req.body.departmentDDLUpdate;
    newEmployee.jobTitle = req.body.jobTitleUpdate;
    newEmployee.startDate = req.body.startDateUpdate;
    newEmployee.salary = req.body.salaryUpdate;

    var upsertData = newEmployee.toObject();
    delete upsertData._id;
    
    Employee.findOneAndUpdate({_id:id}, upsertData, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        var allEmployees = Employee.find(function (err, employees) {
            if (err) return console.error(err);
            res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
          });
    });

} //if querystring ==update CLOSE
if(qString == 'delete') {

    var id = req.query.id;
    Employee.findByIdAndRemove(id, function(err, doc){
        if (err) return res.send(500, { error: err });

        var allEmployees = Employee.find(function (err, employees) {
            if (err) return console.error(err);
            res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
          });
    });
} 
else {
    
    var allEmployees = Employee.find(function (err, employees) {
        if (err) return console.error(err);
        res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
      });

    }//else CLOSE
    
}); //this brings us to form pagesc


//adding new employee ---------------------------------------------
function saveEmployee(employeeInfo) {
    var newEmployee = new Employee(employeeInfo);
    newEmployee.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}//saveEmployee CLOSE


//connecting to db ------------------------------------------------
var mongoClient = require("mongodb").MongoClient.connect;
var server = "mongodb://localhost:27017/Test";
mongoose.connect(server);
var connection = mongoose.connection;
connection.on('connected', function() {
    console.log('connected to db');
});

// schemas and stuff -----------------------------------------------

var emplSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        minlength: [10, 'Not long enough']
        
    },
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: {
        type: String,
        validate: [/[0-9]/, 'Please enter valid numbers only.' ],
    }
  });

var Employee = mongoose.model('employee', emplSchema);

//helpers --------------------------------------------------

hbs.registerHelper('addNewEmployee', (employee) => {
    employee.save(function (err, employee) {
        if(err) return console.error(err)
    }); 
});
hbs.registerHelper('addNewEmployee', (employeeInfo) => {
    var newEmployee = new Employee({
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        department: employeeInfo.department,
        startDate: employeeInfo.startDate,
        jobTitle: employeeInfo.jobTitle,
        salary: employeeInfo.salary
    });
    newEmployee.save(function (err, newEmployee) {
        if(err) return console.error(err)
    }); 
});
//get all employees helper function
hbs.registerHelper('getAllEmployees', (employees) => {


    var table = "<table class='table table-striped table-bordered'>";
    table += "<tr>";
    table += "<th>First Name</th>";
    table += "<th>Last Name</th>";
    table += "<th>Department</th>";
    table += "<th>Start Date</th>";
    table += "<th>Job Title</th>";
    table += "<th>Salary</th>";
    table += "<th>Edit</th>";
    table += "</tr>";

    for(var i = 0; i < employees.length; i++) {
       
        table += `<tr>`;
        table += `<td>${employees[i].firstName}</td>`;
        table += `<td>${employees[i].lastName}</td>`;
        table += `<td>${employees[i].department}</td>`;
        table += `<td>${employees[i].startDate}</td>`;
        table += `<td>${employees[i].jobTitle}</td>`;
        table += `<td>${employees[i].salary}</td>`; 
        table += `<td><form action='/update' method='POST'><input type='hidden' name='hiddenID' value=${employees[i]._id}><input type='submit'name='btnUpdate' value='Update' class='btn-primary' /></form><form action='/delete' method='POST'><input type='hidden' name='hiddenID' value=${employees[i]._id}><input type='submit'name='btnDelete' value='Delete' class='btn-primary' /></form></td>`;   
        table += `</tr>`;

    }

    table += "</table>";

    //console.log("EMPLOYEES" + employees[0].firstName + "coming from function");

    return table;
});


//setting up server ------------------------------------------------
app.listen(3000, () => {
    console.log('server is running on Port 3000');
});