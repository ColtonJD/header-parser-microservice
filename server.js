// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var useragent = require('express-useragent');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(useragent.express());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.set('trust proxy', true);

app.get("/whoami", function (req, res) {
  var language = req.acceptsLanguages();
  var ip = req.ips;
  var software = 'OS: ' + req.useragent.os + ' Browser: ' + req.useragent.browser;
  
  res.json({'ipaddress': ip[0], 'language': language[0], 'software': software});
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
