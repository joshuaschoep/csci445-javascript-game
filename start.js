const express = require('express');
const http = require('http');

const SERVICE_PORT = 4451;

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + 'blasteroids/public/index.html')
})

app.listen(SERVICE_PORT);
