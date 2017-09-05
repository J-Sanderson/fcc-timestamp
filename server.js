var express = require('express');
var moment = require('moment');
var app = express();
app.use(express.static('public'));
var months = ['January',
             'February',
             'March',
             'April',
             'May',
             'June',
             'July',
             'August',
             'September',
             'October',
             'November',
             'December'];

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var date;
  var dateObj = {unix: null, natural: date};
  res.send(JSON.stringify(dateObj));
})

app.listen(process.env.PORT,);
