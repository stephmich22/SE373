var express = require('express');
const hbs = require('hbs');

//initializing express
var app = express();
//setting view engine to hbs
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

app.get('/form',(req,res)=>{
    res.render('form.hbs');
}) //this brings us to form page

function generateColor() {
    var color = ((1<<24)*Math.random()|0).toString(16);
    return color;
}

hbs.registerHelper('generateGrid', (numberFromForm)=>{
    var table = "<table>";

        for(let i = 0; i < numberFromForm; i++){
            table +=`<tr>`;
            for(let j = 0; j < numberFromForm; j++){
                var randoColor = generateColor();
                table += `<td style='background-color:#${randoColor};'>${randoColor}<br /><span style='color:#ffffff;'>${randoColor}</span></td>`;
            }
            table += `</tr>`;
        }
        table += "</table>";
    return table;
})

app.post('/grid',(req,res)=>{
    res.render('grid.hbs', {
        dropDownOption:Number(req.body.ddlNumber)
    })
})

function generateDropDownOptions() {
    var numbers = [3,4,5,10,20];
    var optionsString = "";
    for(let i = 0; i < numbers.length; i++) {
        optionsString += "<option>" + numbers[i] + "</option>";

        console.log(numbers[i]);
    }
    return optionsString;
}
hbs.registerHelper('ddlOptions', generateDropDownOptions());


//setting up server
app.listen(3000, () => {
    console.log('server is running on Port 3000');
});

