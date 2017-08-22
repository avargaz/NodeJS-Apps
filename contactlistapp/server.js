var express = require('express');
var app = express();


//means it's gonna read html, css files. it tells where it's going to find the static files
app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log("Server running on port 3000");
