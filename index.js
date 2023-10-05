// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (_req, res) => {
  const date = new Date();
  const unixStamp = Math.floor(date.getTime());
  const utcStamp = new Date(unixStamp).toUTCString();
  res.json({ unix: unixStamp, utc: utcStamp });
})

app.get("/api/:date", function (req, res, next) {
  const date = req.params.date ? req.params.date : new Date();
  const unixStamp = new Date(date) == 'Invalid Date' ? parseInt(date) : Math.floor(new Date(date).getTime());

  if (isNaN(unixStamp)) {
    res.json({ error: 'Invalid Date'});
  } else {
    const utcStamp = new Date(unixStamp).toUTCString();                                                
    res.json({ unix: unixStamp, utc: utcStamp });
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
