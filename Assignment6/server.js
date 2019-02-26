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
app.get('/index',(req,res)=>{
    res.render('index.hbs');
}); //this brings us to form page

app.use('/update',(req,res)=>{
    res.render('update.hbs');
}); //this brings us to form page

app.use('/delete',(req,res)=>{
    res.render('delete.hbs');
}); //this brings us to form page

app.all('/view',(req,res)=>{


var qString = req.query.employee;

if(qString = 'true') {
    console.log("QSTRING IS TRUE");

    var newEmployee = new Employee();
    newEmployee.firstName = req.body.firstNameAdd;
    newEmployee.lastName = req.body.lastNameAdd;
    newEmployee.department = req.body.departmentDDLAdd;
    newEmployee.jobTitle = req.body.jobTitleAdd;
  //  newEmployee.startDate = req.body.startDateAdd;
  
  newEmployee.save(function (err) {
      if (err) return handleError(err);
      // saved!
      var allEmployees = Employee.find(function (err, employees) {
        if (err) return console.error(err);
        console.log(employees + "THIS IS COMING FROM ALLEMPLOYEES FUNC");
        //res.send({firstName:req.body.firstNameAdd});
        res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
      });
  })
  
} else {
    
    var allEmployees = Employee.find(function (err, employees) {
        if (err) return console.error(err);
        console.log(employees + "THIS IS COMING FROM ALLEMPLOYEES FUNC");
        //res.send({firstName:req.body.firstNameAdd});
        res.render("view.hbs",{employees, firstName:req.body.firstNameAdd});
      });

    }//else CLOSE
    
}); //this brings us to form page


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
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number
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
    table += "<td>First Name</td>";
    table += "<td>Last Name</td>";
    table += "<td>Department</td>";
    table += "<td>Start Date</td>";
    table += "<td>Job Title</td>";
    table += "<td>Salary</td>";
    table += "</tr>";

    for(var i = 0; i < employees.length; i++) {
       
        table += `<tr>`;
        table += `<td>${employees[i].firstName}</td>`;
        table += `<td>${employees[i].lastName}</td>`;
        table += `<td>${employees[i].department}</td>`;
        table += `<td>${employees[i].startDate}</td>`;
        table += `<td>${employees[i].jobTitle}</td>`;
        table += `<td>${employees[i].salary}</td>`;    
        table += `</tr>`;

        console.log("This is an employee:" + employees[i]);
    
    }

    table += "</table>";

    //console.log("EMPLOYEES" + employees[0].firstName + "coming from function");

    return table;
});


//setting up server ------------------------------------------------
app.listen(3000, () => {
    console.log('server is running on Port 3000');
});