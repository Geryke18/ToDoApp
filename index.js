const express = require('express');
const app = express();
const http = require('http').Server(app);
const formidable = require('formidable');
const bodyParser = require('body-parser');      //it needs for css
const fs = require('fs');

app.use(express.static(__dirname));             //it needs for css
app.use(bodyParser.text());                     //it needs for css

app.get('/', (req, res) => {
    fs.readFile('ToDo.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
});

app.get('/getdata', (req, res) => {
  let rawData = fs.readFileSync("DataBase.json");
  let data = JSON.parse(rawData);
  res.json(data);
  console.log(data);
  return res.end();
});

app.post('/addtodo', (req, res) => {
  let rawData = fs.readFileSync("DataBase.json");
  let data = JSON.parse(rawData);
  data.todos.push(req.body);
  let stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync("DataBase.json", stringData);
  return res.end();
});

app.post('/deltodo', (req, res) => {
  let rawData = fs.readFileSync("DataBase.json");
  let data = JSON.parse(rawData);
  for( var i = 0; i < data.todos.length; i++){ 
    if ( data.todos[i] === req.body) {
      data.todos.splice(i, 1); 
    }
  }
  let stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync("DataBase.json", stringData);
  return res.end();
});

app.post('/deldone', (req, res) => {
  let rawData = fs.readFileSync("DataBase.json");
  let data = JSON.parse(rawData);
  for( var i = 0; i < data.dones.length; i++){ 
    if ( data.dones[i] === req.body) {
      data.dones.splice(i, 1); 
    }
  }
  let stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync("DataBase.json", stringData);
  return res.end();
});

app.post('/donetodo', (req, res) => {
  let rawData = fs.readFileSync("DataBase.json");
  let data = JSON.parse(rawData);
  data.dones.push(req.body);
  for( var i = 0; i < data.todos.length; i++){ 
    if ( data.todos[i] === req.body) {
      data.todos.splice(i, 1); 
    }
  }
  let stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync("DataBase.json", stringData);
  return res.end();
});

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});