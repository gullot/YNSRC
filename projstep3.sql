-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT * FROM Customers WHERE :columnName = :input;

INSERT INTO Customers (customerName, telephone)
VALUES (:customerName, :telephone);

DELETE FROM Customers WHERE customerName = :customerName and telephone = :telephone;

SELECT * FROM Spaceships WHERE :columnName = :input;

INSERT INTO Spaceships (customerID, spaceshipMake, spaceshipModel)
VALUES ((SELECT customerID FROM Customers WHERE customerName = :customerName), :spaceshipMake, :spaceshipModel);

SELECT * FROM Invoices WHERE :columnName = :input;

INSERT INTO Invoices (cost, spaceshipID)
VALUES (:cost, (SELECT spaceshipID FROM Spaceships WHERE customerID = (SELECT customerID FROM Customers WHERE customerName = :customerName) and spaceshipModel = :spaceshipModel));

INSERT INTO InvoiceDetails (invoiceID, repairID)
VALUES (:invoiceID, :repairID)

INSERT INTO RepairTypes (repairName, cost)
VALUES (:repairName, :cost)