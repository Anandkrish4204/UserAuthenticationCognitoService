var express = require('express');
var app = express();
var routes = require('./routes');

app
.use(express.urlencoded())
.use(express.json());


app.use('/', routes);
//app.get('/', (req, res) => res.send('Hello from nodejs authentication server'));

app.listen(process.env.PORT,()=> console.log("Server listening in port 2999"));