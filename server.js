const express = require('express');
const compression = require('compression')
const path = require('path');
const port = process.env.PORT || 8080;
const favicon = require('express-favicon');

const app = express();

// compress all responses
app.use(compression())

//favicon
app.use(favicon(__dirname + '/dist/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
