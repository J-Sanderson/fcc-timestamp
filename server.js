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

function getDate(date) {
  return months[date.month()] +
    ' ' +
    date.date() + 
    ', ' +
    date.year();
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var dateString = req.params.time;
  var date;
  var dateObj = {unix: null, natural: null};
  //does time param contain only numbers?
  if (dateString.match(/^[0-9]+$/, 'g') !== null) {
    //number only string, treat as unix timestamp
    date = moment(parseInt(dateString) * 1000);
    dateObj.unix = dateString;
    dateObj.natural = getDate(date);
  } else {
    date = moment(dateString);
    //is it valid?
    if (date.isValid()) {
      dateObj.unix = date.unix();
      dateObj.natural = getDate(date);
    }
  }
  res.send(JSON.stringify(dateObj));
})

app.listen(process.env.PORT,);
