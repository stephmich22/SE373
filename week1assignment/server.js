var http = require('http');
var url = require('url');
var fileSystem = require('fs');

//request is the url put into browser and response is what we get back
http.createServer(function (request, response) {
   
    var pathName = url.parse(request.url).pathname;

    //make a variable with if else statement that controls the content type bc the json file needs to be of that content type and the rest needs to be html
    
        if(request.url == '/index')
        {
            fileName = "index.html";
            //response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
        }
        if (request.url == '/fake-page')
        {
            fileName = "index.html";
           // response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
        }
        
        else {
            var fileName = pathName.substr(1); /* lets remove the "/" from the name */
             
        }
       
        console.log("PathName: " + pathName + ", FileName: " + fileName + "requestUrl: " + request.url);
    /* lets try to read the html page found */
    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            /* Send the HTTP header 
             * HTTP Status: 400 : NOT FOUND
             * Content Type: text/html 
             */

            response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
           // response.writeHead(400, {'Content-Type': 'text/html'});   
           // response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
            console.log("PathName: " + pathName + ", FileName: " + fileName + "requestUrl: " + request.url);
        } else {
            /* Send the HTTP header 
             * HTTP Status: 200 : OK
             * Content Type: text/html 
             */
         /*   if(fileName == 'index')
            {
                response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
            }
            else if (fileName == 'fake-page')
            {

            }*/
        // else {
            response.writeHead(200, {'Content-Type': 'text/html'}); 
            response.write(data.toString());
           
            
            console.log("PathName: " + pathName + ", FileName: " + fileName + "requestUrl: " + request.url);
        // }
        }     
        
        /* the response is complete */
        response.end();
        
    } //callback CLOSE 
       
   
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index.html');