// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 61288;                 // Set a port number at the top so it's easy to change in the future

// handlebars stuff
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')


//routes below are based on and adapted from the CS340 node js starter app 
/*
    ROUTES
*/
app.get('/', function (req, res) {

        res.render('index');              // Note the call to render() and not send(). Using render() ensures the templating engine
                                            // will process this file, before sending the finished HTML to the client.
});

// route to view the customer data
app.get('/view_customers', function (req, res) {
    let query1 = "SELECT customerID AS ID, customerName AS Name, telephone AS Telephone FROM Customers";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('view_customers', { data: rows });

    })
});

// route to view the spaceship data
app.get('/view_spaceships', function (req, res) {
    let query1 = "SELECT spaceshipID AS ID, spaceshipMake AS Make, spaceshipModel AS Model, customerID FROM Spaceships";

    //to get the names of the customers for the drop down for add_customer
    let query2 = "SELECT * FROM Customers";

    db.pool.query(query1, function (error, rows, fields) {

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
                return Object.assign(ship, { customerName: customerMap[ship.customerID] })
            })

            return res.render('view_spaceships', { data: spaceships, customers: customers });
        })

    })
});

// route to view the invoice data
app.get('/view_invoices', function (req, res) {
    let query1 = "SELECT invoiceID AS ID, cost AS Cost, spaceshipID AS spaceshipID FROM Invoices";

    let query2 = "SELECT * FROM RepairTypes";

    db.pool.query(query1, function (error, rows, fields) {

        let invoices = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let services = rows;
            res.render('view_invoices', { data: invoices, services: services });
        })
    })
});

// route to view the services (repairtypes) data
app.get('/view_services', function (req, res) {
    let query1 = "SELECT repairID AS ID, repairName AS Repair, cost AS Cost FROM RepairTypes";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('view_services', { data: rows });
    })
});

// route to view the intersection table (invoicedetails) data
app.get('/view_invoicedetails', function (req, res) {

    //use join to make intersection table more user friendly/display more information
    let query1 = "SELECT InvoiceDetails.invoiceID AS 'invoiceID', InvoiceDetails.repairID AS 'serviceID', Customers.customerName AS Name, Spaceships.spaceshipID AS 'spaceshipID', Invoices.cost AS 'totalCost', RepairTypes.repairName AS 'serviceName', RepairTypes.cost AS 'serviceCost' FROM InvoiceDetails INNER JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID INNER JOIN RepairTypes ON RepairTypes.repairID = InvoiceDetails.repairID INNER JOIN Spaceships ON Spaceships.spaceshipID = Invoices.spaceshipID LEFT JOIN Customers ON Customers.customerID = Spaceships.customerID ORDER BY invoiceID, serviceID ASC"

    db.pool.query(query1, function (error, rows, fields) {
        InvoiceDetails = rows;
        let query2 = "SELECT invoiceID FROM Invoices ORDER BY invoiceID"
        db.pool.query(query2, function (error, rows, fields) {
            invoices = rows;
            let query3 = "SELECT * FROM RepairTypes"
            db.pool.query(query3, function (error, rows, fields) {
                res.render('view_invoicedetails', { data: InvoiceDetails, invoices: invoices, services: rows });
            })
        })
    })
});

// route to add a customer
app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, telephone) VALUES  ('${data.customerName}', '${data.telephone}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on customers
            query2 = `SELECT * FROM Customers`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// route to add a spaceship
app.post('/add-spaceship-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Spaceships (spaceshipMake, spaceshipModel, customerID) VALUES ('${data.spaceshipMake}', '${data.spaceshipModel}', (SELECT customerID FROM Customers WHERE customerID = '${data.owner}'))`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on spaceships
            query2 = `SELECT * FROM Spaceships`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// route to add a repair
app.post('/add-repair-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO RepairTypes (repairName, cost) VALUES ('${data.repairName}', '${data.cost}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on repairtypes
            query2 = `SELECT * FROM RepairTypes`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// route to delete a customer
app.delete('/delete-customer-ajax/', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomers = 'DELETE FROM Customers WHERE customerID = ?';

    db.pool.query(deleteCustomers, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// route to delete a repair
app.delete('/delete-repair-ajax/', function (req, res, next) {
    let data = req.body;
    console.log(data);
    let repairID = parseInt(data.id);
    let deleteRepairs = 'DELETE FROM RepairTypes WHERE repairID = ?';

    db.pool.query(deleteRepairs, [repairID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// route to update a customer
app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;
    let customerIDValue = data.customerIDValue;
    let telephone = data.telephone;
    // query updating the input telephone from the selected customer
    let queryUpdateTelephone = `UPDATE Customers SET telephone = '${telephone}' WHERE customerID = '${customerIDValue}'`;
    db.pool.query(queryUpdateTelephone, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

// route for adding an invoice
app.post('/add-invoice-ajax', function (req, res) {
    let data = req.body;
    let repairServices = data.repairServices;

    //query to insert the invoice based on the cost of the existing, selected repair while using the owner and the model to choose the right spaceshipID
    query1 = `INSERT INTO Invoices (cost, spaceshipID) VALUES ('${data.cost}', (SELECT spaceshipID FROM Spaceships WHERE spaceshipModel = '${data.model}' AND customerID = (SELECT customerID FROM Customers WHERE customerName = '${data.owner}')))`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {

            query2 = `SELECT * FROM Invoices`

            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    rowsToSend = rows;
                    invoiceID = rowsToSend[rowsToSend.length - 1].invoiceID

                    //iterate through repairs and insert to intersection table for each added repair
                    for (var i = 0; i < repairServices.length; i++) {
                        query3 = `INSERT INTO InvoiceDetails (invoiceID, repairID) VALUES ('${invoiceID}', (SELECT repairID FROM RepairTypes WHERE repairName = '${repairServices[i]}'))`
                        db.pool.query(query3, function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            }
                        })
                    }
                    res.send(rowsToSend);
                }
            })
        }
    })
});

// route for adding invoice-service relationship
app.post('/add-invoicedetail-ajax', function (req, res) {
    let data = req.body;
    // query for inserting the invoice and repairIDs
    query1 = `INSERT INTO InvoiceDetails(invoiceID, repairID) VALUE ('${data.invoiceID}', '${data.repairID}')`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            //next query to grab the cost of the repair
            query2 = `SELECT cost FROM RepairTypes WHERE repairID = '${data.repairID}'`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // next query to grab the cost of the INVOICE
                    cost = rows[rows.length - 1].cost;
                    query3 = `SELECT cost from Invoices WHERE invoiceID = '${data.invoiceID}'`;
                    db.pool.query(query3, function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            // update the total cost of that invoice based on the added repairs
                            cost += rows[rows.length - 1].cost;
                            query4 = `UPDATE Invoices SET cost = '${cost}' WHERE invoiceID = '${data.invoiceID}'`;
                            db.pool.query(query4, function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                }
                                else {
                                    query5 = `SELECT * FROM InvoiceDetails`;
                                    db.pool.query(query5, function (error, rows, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);
                                        }
                                        else {
                                            res.send(rows);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

// route to update an invoice
app.put('/put-invoice-ajax', function(req, res, next) {
    let data = req.body;
    let invoiceIDValue = data.invoiceIDValue;
    let repairServices = data.repairServices;
    let cost = data.cost
    let queryUpdateInvoice = `UPDATE Invoices SET cost = '${cost}' WHERE invoiceID = '${invoiceIDValue}'`;
    db.pool.query(queryUpdateTelephone, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            let queryFindInvoiceDetails = `SELECT repairName FROM RepairTypes WHERE repair ID = (SELECT repairID FROM InvoiceDetails WHERE invoiceID = '${invoiceIDValue}')`
            db.pool.query(queryFindInvoiceDetails, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    let queryResetInvoiceDetails = `DELETE FROM InvoiceDetails WHERE invoiceID = '${invoiceIDValue}'`
                    for (var i = 0; repairServices[i]; i++) {

                        for (var j = 0; rows[j], j++;) {
                            if (rows[j] == repairServices) {
                                
                            }
                        }
                    }
                    db.pool.query(queryResetInvoiceDetails, function (error, rows, fields) {

                    })
                }
            })
        }
    }
    )
})

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});