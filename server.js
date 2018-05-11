// Dependencies
var express = require('express');
var bodyParser = require('body-parser');


// Set up the Express App
var app = express();
var PORT = 3000;

// parse various different custom JSON types as JSON
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
var htmlRoutes = require('./app/routing/htmlRoutes');
htmlRoutes(app);

var apiRoutes = require('./app/routing/apiRoutes');
apiRoutes(app);

/*app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});*/

// Displays a single friend or returns false
app.get("/api/friend/:friend", function(req, res) {
  var futureMate = req.params.friend;

  console.log(futureMate);

  for (var i =0; i < friend.length; i++ ) {
    if (futureMate === friend[i].routeName) {
      return res.json(friend[i]);
    }
  }

  return res.json(false);
});


// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
