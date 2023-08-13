// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
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

    res.render('index');
        //let query1 = "SELECT * FROM Customers";

        //db.pool.query(query1, function(error, rows, fields){

            //res.render('index', {data: rows});              // Note the call to render() and not send(). Using render() ensures the templating engine
                                                // will process this file, before sending the finished HTML to the client.
            //})
                          
    });    

// app.js - ROUTES section
app.get('/view_customers', function(req, res)
    {
        let query1= "SELECT customerID AS ID, customerName AS Name, telephone AS Telephone FROM Customers";

        db.pool.query(query1, function(error, rows, fields){

            res.render('view_customers', {data:rows});

        })
    });

app.get('/view_spaceships', function(req, res)
    {
        let query1= "SELECT spaceshipID AS ID, spaceshipMake AS Make, spaceshipModel AS Model, customerID FROM Spaceships";

        //to get the names of the customers for the drop down for add_customer
        let query2 = "SELECT * FROM Customers";

        db.pool.query(query1, function(error, rows, fields){

            let spaceships = rows;

            db.pool.query(query2, (error, rows, fields) => {
                let customers = rows;

                //making each ID related to the name of the customer
                let customerMap = {}
                customers.map(customer => {
                    let id = parseInt(customer.customerID);
                    customerMap[id] = customer["customerName"];
                })

                //appending the spaceships table with the customer name as well
                spaceships = spaceships.map(ship => {
                    return Object.assign(ship, {customerName: customerMap[ship.customerID]})
                })

                //console.log(customers);
                //console.log(customerMap);
                //console.log(spaceships);

                return res.render('view_spaceships', {data: spaceships, customers: customers});
            })
            
            //res.render('view_spaceships', {data:rows});

        })
    });

app.get('/view_invoices', function(req, res)
    {
        let query1= "SELECT invoiceID AS ID, cost AS Cost, spaceshipID AS spaceshipID FROM Invoices";

        let query2= "SELECT * FROM RepairTypes";

        db.pool.query(query1, function(error, rows, fields){

            let invoices = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let services = rows;
                console.log(services);
                res.render('view_invoices', {data:invoices, services:services});

            })
            
            

        })
    });

app.get('/view_services', function(req, res)
    {
        let query1= "SELECT repairID AS ID, repairName AS Repair, cost AS Cost FROM RepairTypes";

        db.pool.query(query1, function(error, rows, fields){

            res.render('view_services', {data:rows});

        })
    });

app.get('/view_invoicedetails', function(req, res)
    {
        let query1= "SELECT InvoiceDetails.invoiceID, InvoiceDetails.repairID, Customers.customerName, Spaceships.spaceshipID, Invoices.cost, RepairTypes.repairName, RepairTypes.cost AS repairCost FROM InvoiceDetails INNER JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID INNER JOIN RepairTypes ON RepairTypes.repairID = InvoiceDetails.repairID INNER JOIN Spaceships ON Spaceships.spaceshipID = Invoices.spaceshipID INNER JOIN Customers ON Customers.customerID = Spaceships.customerID"

        db.pool.query(query1, function(error, rows, fields){

            res.render('view_invoicedetails', {data:rows});

        })
    });

app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    /*// Capture NULL values   NO NULL VALUES FOR CUSTOMERS
    let homeworld = parseInt(data.homeworld);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }*/ 

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, telephone) VALUES  ('${data.customerName}', '${data.telephone}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on customers
            query2 = `SELECT * FROM Customers`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-spaceship-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    //console.log(data.owner);

    // Create the query and run it on the database (data.owner)?????
    query1 = `INSERT INTO Spaceships (spaceshipMake, spaceshipModel, customerID) VALUES ('${data.spaceshipMake}', '${data.spaceshipModel}', (SELECT customerID FROM Customers WHERE customerID = '${data.owner}'))`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on spaceships
            query2 = `SELECT * FROM Spaceships`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-repair-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    //console.log(data.owner);

    // Create the query and run it on the database (data.owner)?????
    query1 = `INSERT INTO RepairTypes (repairName, cost) VALUES ('${data.repairName}', '${data.cost}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on repairtypes
            query2 = `SELECT * FROM RepairTypes`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
    console.log("I can do more stuff");
});
    
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    console.log(data);
    let customerID = parseInt(data.id);
    let deleteCustomers = 'DELETE FROM Customers WHERE customerID = ?';

    db.pool.query(deleteCustomers, [customerID], function(error, rows, fields){
        if (error) {

            console.log(error);
            res.sendStatus(400);

        }
        else {
            res.sendStatus(204);
        }
    })
});

app.delete('/delete-repair-ajax/', function(req,res,next){
    let data = req.body;
    console.log(data);
    let repairID = parseInt(data.id);
    let deleteRepairs = 'DELETE FROM RepairTypes WHERE repairID = ?';

    db.pool.query(deleteRepairs, [repairID], function(error, rows, fields){
        if (error) {

            console.log(error);
            res.sendStatus(400);

        }
        else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-customer-ajax', function(req, res, next) {
    let data = req.body;
    let customerIDValue = data.customerIDValue;
    let telephone = data.telephone;
    let queryUpdateTelephone = `UPDATE Customers SET telephone = '${telephone}' WHERE customerID = '${customerIDValue}'`;
    db.pool.query(queryUpdateTelephone, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            res.send(rows);
        }
    }  
)});

app.post('/add-invoice-ajax', function(req, res) {
    let data = req.body;
    let repairServices = data.repairServices;
    query1 = `INSERT INTO Invoices (cost, spaceshipID) VALUES ('${data.cost}', (SELECT spaceshipID FROM Spaceships WHERE spaceshipModel = '${data.model}' AND customerID = (SELECT customerID FROM Customers WHERE customerName = '${data.owner}')))`;
    db.pool.query(query1, function(error, rows, fields){

        if(error) {
            res.sendStatus(400);
        }
        else {

            query2 = `SELECT * FROM Invoices`

            db.pool.query(query2, function(error, rows, fields){
                if(error) {
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    }
)});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip1.engr.oregonstate.edu/:' + PORT + '; press Ctrl-C to terminate.')
});