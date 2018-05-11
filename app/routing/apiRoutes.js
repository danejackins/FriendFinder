// Routes

var friends = require('../data/friends.json');

module.exports = function(app) {

  //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  // Create New "Friend" - takes in JSON input

  app.post("/api/friends", function(req, res) {

    var newFriend = req.body;
    console.log(newFriend);
  
    friends.push(newFriend);

    /* Find best match
      1. loop over `friends`
      2. loop over scores (of both `newFriend` and `currentFriend`)
      3. get total difference
      4. if total difference is less than `bestMatch` total difference, replace best match
    */

    var bestMatch = {
      difference: Infinity
    };

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      var difference = 0; // 0 + 2 + 1 + 3 + 0 + ... = 12
      
      for (var j = 0; j < newFriend.scores.length; j++) {
        // scores come in as strings so we have to parse them
        var newFriendScore = parseInt(newFriend.scores[j]);
        var currentFriendScore = currentFriend.scores[j];
        difference += Math.abs(newFriendScore - currentFriendScore);
      }

      // check to see if `newFriend` is the best match
      if (difference < bestMatch.difference) {
        currentFriend.difference = difference;
        bestMatch = currentFriend;
      }
    }
  
    res.json(bestMatch);
    /*
      1. extract new friend from request (req)
      2. find best match
      3. add new friend to friends array
      4. return best match
    */

  });

}