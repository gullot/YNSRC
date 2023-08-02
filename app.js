// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 61287;                 // Set a port number at the top so it's easy to change in the future

// handlebars stuff
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')


/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Customers";

        db.pool.query(query1, function(error, rows, fields){

            res.render('index', {data: rows});              // Note the call to render() and not send(). Using render() ensures the templating engine
                                                // will process this file, before sending the finished HTML to the client.
            })
                          
    });                                         

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});