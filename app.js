var express = require('express');
app = express();

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send(`<html lang="en" >
      <head>
          <meta charset="utf-8" />
          <title>CSC 227 Final Project</title>
      </head>
      <body>
          <script src="javascript.js"></script>
      </body>
  </html>`);
});

app.get('/resume', function(req, res) {
  res.send(`<html>  
      <head>      
          <title>Resume</title>          
          <style>
              * {
                  font-family: "Courier New";
              }
              .col {
                  float: left;
              }
              .name {
                  width: 40%;
              }
              .text {
                  width: 60%;
                  white-space: pre-line;
              }
              .row:after {
                  content: "";
                  display: table;
                  padding-bottom: 16px;
                  box-sizing: border-box;
                  clear: both;
              }
          </style>          
      </head>      
      <body>      
          <header>          
              <p>
                  John Doe<br>
                  1234 Cranberry Lane<br>
                  (123) 123-1234 / JohnDoe@gmail.com
              </p>
              <hr>              
          </header>
      </body>      
  </html>`);
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

