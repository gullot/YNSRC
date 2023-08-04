-- YNSRC Database DDL
-- CS340 Project Group 110
-- Alexander Dembo, Thomas Gullo
-- Updated August 3rd, 2023


--
-- Database: `YNSRC`
--

-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT * FROM Customers WHERE :columnName = :input;

INSERT INTO Customers (customerName, telephone)
VALUES (:customerName, :telephone);

-- Select a customer based off attribute values

DELETE FROM Customers WHERE customerName = :customerName and telephone = :telephone;

-- Select all spaceships where an attribute is equal to an input

SELECT * FROM Spaceships WHERE :columnName = :input;

-- Add a spaceship into the db

INSERT INTO Spaceships (customerID, spaceshipMake, spaceshipModel)
VALUES ((SELECT customerID FROM Customers WHERE customerName = :customerName), :spaceshipMake, :spaceshipModel);


-- Select all invoices

SELECT * FROM Invoices WHERE :columnName = :input;

INSERT INTO Invoices (cost, spaceshipID)
VALUES (:cost, (SELECT spaceshipID FROM Spaceships WHERE customerID = (SELECT customerID FROM Customers WHERE customerName = :customerName) and spaceshipModel = :spaceshipModel));

INSERT INTO InvoiceDetails (invoiceID, repairID)
VALUES (:invoiceID, :repairID)

INSERT INTO RepairTypes (repairName, cost)
VALUES (:repairName, :cost)

-- display invoicedtails table with more than just FKs
SELECT repairID, repairName FROM RepairTypes
INNER JOIN InvoiceDetails ON RepairTypes.repairID = repairID;

-- colon indicates user input. Added update and delete functions

-- update button is included above

-- this is what happens when the "SAVE" from the "UPDATE" button is clicked
UPDATE Customers
SET customerName = :customerName, telephone = :telephone
WHERE customerID = :customerID;

-- this is the delete button from RepairTypes. Gets rid of a whole row. 
-- Note that since invoicedetails is delete on cascade, this will delete the associated row in the invoicedetails also
DELETE FROM RepairTypes WHERE repairID = :repairID;

