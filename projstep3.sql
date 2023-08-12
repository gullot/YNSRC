-- YNSRC Database DDL
-- CS340 Project Group 110
-- Alexander Dembo, Thomas Gullo
-- Updated August 3rd, 2023


--
-- Database: `YNSRC`
--


---CUSTOMERS--------------------------------------------------------------------

-- Query to display Customers entity
SELECT customerID AS ID, customerName AS Name, telephone AS Telephone FROM Customers;

-- Query to insert into Customers based on '${data.customerName}' and '${data.telephone}' input
INSERT INTO Customers (customerName, telephone) VALUES  ('${data.customerName}', '${data.telephone}');

-- Query to get all Customers attributes for dynamic drop-down
SELECT * FROM Customers;

-- Query to delete a customer
DELETE FROM Customers WHERE customerID = ?;

-- Query to update a customer based on new '${telephone}' and '${customerIDValue}' input
UPDATE Customers SET telephone = '${telephone}' WHERE customerID = '${customerIDValue}';


---SPACESHIPS------------------------------------------------------------------

-- Query to display Spaceships entity
SELECT spaceshipID AS ID, spaceshipMake AS Make, spaceshipModel AS Model, customerID FROM Spaceships;

-- Query to add a spaceship based on '${data.spaceshipMake}', '${data.spaceshipModel}', and '${data.owner}' input
INSERT INTO Spaceships (spaceshipMake, spaceshipModel, customerID) VALUES ('${data.spaceshipMake}', '${data.spaceshipModel}', (SELECT customerID FROM Customers WHERE customerID = '${data.owner}'));

--Query to get info from spaceships for dynamic drop down
SELECT * FROM Spaceships;


---INVOICES---------------------------------------------------------------------
-- Query to display Invoices entity
--THIS WILL PROBABLY CHANGEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SELECT * FROM Invoices;


---REPAIRTYPES------------------------------------------------------------------

-- Query to display RepairTypes entity
SELECT repairID AS ID, repairName AS Repair, cost AS Cost FROM RepairTypes;

-- Query for adding a repair based on '${data.repairName}' and '${data.cost}' input
INSERT INTO RepairTypes (repairName, cost) VALUES ('${data.repairName}', '${data.cost}');

-- Query for secondary repair types data grab
SELECT * FROM RepairTypes;

-- Query to delete a repair
DELETE FROM RepairTypes WHERE repairID = ?;


---INVOICEDETAILS---------------------------------------------------------------

-- Query to display InvoiceDetails, Customers, Spaceships, and RepairTypes all at once on Invoice Details page
SELECT InvoiceDetails.invoiceID, InvoiceDetails.repairID, Customers.customerName, Spaceships.spaceshipID, Invoices.cost, RepairTypes.repairName, RepairTypes.cost AS repairCost FROM InvoiceDetails INNER JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID INNER JOIN RepairTypes ON RepairTypes.repairID = InvoiceDetails.repairID INNER JOIN Spaceships ON Spaceships.spaceshipID = Invoices.spaceshipID INNER JOIN Customers ON Customers.customerID = Spaceships.customerID;




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

