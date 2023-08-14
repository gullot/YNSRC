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

-- Query to get the customerName to provide to the dynamic drop downs in the update spaceship page based on the ${newOwner}
SELECT customerName FROM Customers WHERE customerID = '${newOwner}';


---SPACESHIPS------------------------------------------------------------------

-- Query to display Spaceships entity
SELECT spaceshipID AS ID, spaceshipMake AS Make, spaceshipModel AS Model, customerID FROM Spaceships;

-- Query to add a spaceship based on '${data.spaceshipMake}', '${data.spaceshipModel}', and '${data.owner}' input
INSERT INTO Spaceships (spaceshipMake, spaceshipModel, customerID) VALUES ('${data.spaceshipMake}', '${data.spaceshipModel}', (SELECT customerID FROM Customers WHERE customerID = '${data.owner}'));

-- Query to update spaceship based on the ${newOwner}, ${newMake}, ${newModel} where the ${spaceshipIDValue} matches the input
UPDATE Spaceships SET customerID = ${newOwner}, spaceshipMake = '${newMake}', spaceshipModel = '${newModel}' WHERE spaceshipID = '${spaceshipIDValue}';

--Query to get info from spaceships for dynamic drop down
SELECT * FROM Spaceships;


---INVOICES---------------------------------------------------------------------

-- Query to display Invoices entity
SELECT invoiceID AS ID, cost AS Cost, spaceshipID AS spaceshipID FROM Invoices;

-- Query to add to Invoices entity based on user input '${data.cost}' to the spaceship that has spaceshipModel = '${data.model}' and customerName = '${data.owner}'
INSERT INTO Invoices (cost, spaceshipID) VALUES ('${data.cost}', (SELECT spaceshipID FROM Spaceships WHERE spaceshipModel = '${data.model}' AND customerID = (SELECT customerID FROM Customers WHERE customerName = '${data.owner}')));

-- Query to update the invoice based on '${cost}' and '${invoiceIDValue}'
UPDATE Invoices SET cost = '${cost}' WHERE invoiceID = '${invoiceIDValue}';
-- Query to grab repair name to update invoice with 
SELECT repairName FROM RepairTypes WHERE repair ID = (SELECT repairID FROM InvoiceDetails WHERE invoiceID = '${invoiceIDValue}');

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
SELECT InvoiceDetails.invoiceID AS 'invoiceID', InvoiceDetails.repairID AS 'serviceID', Customers.customerName AS Name, Spaceships.spaceshipID AS 'spaceshipID', Invoices.cost AS 'totalCost', RepairTypes.repairName AS 'serviceName', RepairTypes.cost AS 'serviceCost' FROM InvoiceDetails INNER JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID INNER JOIN RepairTypes ON RepairTypes.repairID = InvoiceDetails.repairID INNER JOIN Spaceships ON Spaceships.spaceshipID = Invoices.spaceshipID LEFT JOIN Customers ON Customers.customerID = Spaceships.customerID ORDER BY invoiceID, serviceID ASC;
-- Query to return the related invoiceIDs for the invoicedetails join
SELECT invoiceID FROM Invoices ORDER BY invoiceID;
-- Query to return the RepairType information for the invoicedetails join
SELECT * FROM RepairTypes;

-- Query to add an invoice-service relationship based on '${data.invoiceID}' and '${data.repairID}'
INSERT INTO InvoiceDetails(invoiceID, repairID) VALUE ('${data.invoiceID}', '${data.repairID}')
-- Query to grab the cost of the repair needing to be updated based on the addition of the new service to be added
SELECT cost FROM RepairTypes WHERE repairID = '${data.repairID}';
-- Query to grab the cost of the invoice needing to be updated
SELECT cost from Invoices WHERE invoiceID = '${data.invoiceID}';
-- Query updating the total cost of the related invoice from the new relationship
UPDATE Invoices SET cost = '${cost}' WHERE invoiceID = '${data.invoiceID}';