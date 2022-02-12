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

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});