var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function (req, res) {
  var song = req.body;
  var songTitle = req.body.title.toLowerCase();
  var songArtist = req.body.artist.toLowerCase();

  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var today = new Date();
  var todaysMonth = month[today.getMonth()];
  var todaysYear = today.getFullYear();
  var todaysDay = today.getDate();

  song.dateAdded = todaysMonth + " " + todaysDay + ", " + todaysYear;
  console.log('song', song);

  var duplicateCounter = 0;

  if (songTitle === "") {
    res.sendStatus(400);
  } else if(songArtist === "") {
    res.sendStatus(400);
  } else if (songs.length === 0) {
      songs.push(song);
      res.sendStatus(200);
  } else {
    songs.forEach(function(songInArray, i) {
      duplicateCounter = 0;
      if (songTitle === songInArray.title.toLowerCase()) {
        duplicateCounter++;
        res.sendStatus(400);
      }
    });
    if (duplicateCounter === 0) {
      songs.push(song);
      res.sendStatus(200);
    }
  }


  console.log('songs uno', songs);

  // songs.push(song);
  // res.sendStatus(200);

  // res.end();

});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
