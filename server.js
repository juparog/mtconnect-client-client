const express = require('express');
const path = require('path');
const app = express();
const config = require('./config/environment/config');

const port = config.get('port') || 8080;
const basePath = __dirname;

app.use('/', express.static(path.join(basePath, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(basePath, 'build/index.html'));
});

app.listen(port, function () {
  console.log('Server listening on port '+port+'!');
});