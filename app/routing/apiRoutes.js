// Pull in Dependencies required

var path = require('path');

//Import list of friends entries

var friends = require('../data/friends.js');

// Export two APIs routes

module.exports = function(app) {
  //Display a JSON of all possible friends
  app.get('/api/friends', function(_req, res) {
    res.json(friends);
  });

  //  Incoming survey entries
  app.post('/api/friends', function(req, res) {
    //User input object
    var userInput = req.body;
    var userResponses = userInput.scores;
    // Compute best friend match
    var matchName = '';
    var matchImage = '';
    // Initial value comparison
    var totalDifference = 10000;
    // Compatibility Logic
    // check all your system friends list
    for (var i = 0; i < friends.length; i++) {
      // calculate differences for each question
      var diff = 0;
      for (var j = 0; j < userResponses.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userResponses[j]);
      }

      if (diff < totalDifference) {
        totalDifferences = diff;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    // Adding New User to your friend list
    friends.push(userInput);

    //Sending a Response
    res.json({ status: 'Ok', matchName: matchName, matchImage: matchImage });
  });
};
