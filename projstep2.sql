-- YNSRC Database DDL
-- CS340 Project Group 110
-- Alexander Dembo, Thomas Gullo
-- Updated August 3rd, 2023


--
-- Database: `YNSRC`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `customerName` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL
);

--
-- Sample data for table `Customers`
--

INSERT INTO `Customers` (`customerName`, `telephone`) VALUES
('Regina', '99-123-456-7890'),
('George', '12-156-184-4452'),
('Lee', '55-856-155-4154');

-- --------------------------------------------------------

--
-- Table structure for table `Spaceships`
--

CREATE TABLE `Spaceships` (
  `spaceshipID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `customerID` int(11),
  `spaceshipMake` varchar(45) NOT NULL,
  `spaceshipModel` varchar(45) NOT NULL,
  FOREIGN KEY (customerID) 
	REFERENCES Customers(customerID) 
	ON DELETE SET NULL
);
--
-- Sample data for table `Spaceships`
--

INSERT INTO `Spaceships` (`customerID`, `spaceshipMake`, `spaceshipModel`) VALUES
(3, 'Toyoda', 'Spamry'),
(3, 'Jonda', 'Spinsight'),
(2, 'Fjord', 'Fjocus'),
(1, 'Starwagon', 'StarRabbit'),
(1, 'Toyoda', 'Spamry');

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cost` int(11) NOT NULL,
  `spaceshipID` int(11) NOT NULL, 
  FOREIGN KEY (spaceshipID) 
	REFERENCES Spaceships(spaceshipID) 
    ON DELETE RESTRICT
);

--
-- Sample data for table `Invoices`
--

INSERT INTO `Invoices` (`cost`, `spaceshipID`) VALUES
(85, 2),
(95, 3),
(30, 5);

-- --------------------------------------------------------

--
-- Table structure for table `RepairTypes`
--

CREATE TABLE `RepairTypes` (
  `repairID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `repairName` varchar(45) NOT NULL,
  `cost` int(11) NOT NULL
);

--
-- Sample data for table `RepairTypes`
--

INSERT INTO `RepairTypes` (`repairName`, `cost`) VALUES
('Galactic Oil Change', 35),
('Spaceshield Replacement', 50),
('Landing Gear Fluid Change', 45),
('Muffler Repair', 30);

-- --------------------------------------------------------

--
-- Table structure for table `InvoiceDetails`
--

CREATE TABLE `InvoiceDetails` (
  `invoiceID` int(11),
  `repairID` int(11),
  FOREIGN KEY (invoiceID) REFERENCES Invoices(invoiceID) ON DELETE CASCADE,
  FOREIGN KEY (repairID) REFERENCES RepairTypes(repairID) ON DELETE CASCADE
);

--
-- Sample data for table `InvoiceDetails`
--

INSERT INTO `InvoiceDetails` (`invoiceID`, `repairID`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------
