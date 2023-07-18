-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2023 at 05:35 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `YNSRC`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `CustomerID` int(11) NOT NULL,
  `customerName` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`CustomerID`, `customerName`, `telephone`) VALUES
(1, 'Regina', '99-123-456-7890'),
(2, 'George', '12-156-184-4452'),
(3, 'Lee', '55-856-155-4154');

-- --------------------------------------------------------

--
-- Table structure for table `InvoiceDetails`
--

CREATE TABLE `InvoiceDetails` (
  `invoiceID` int(11) NOT NULL,
  `repairID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `InvoiceDetails`
--

INSERT INTO `InvoiceDetails` (`invoiceID`, `repairID`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `spaceshipID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`invoiceID`, `cost`, `spaceshipID`) VALUES
(1, 85, 2),
(2, 95, 3),
(3, 30, 5);

-- --------------------------------------------------------

--
-- Table structure for table `RepairTypes`
--

CREATE TABLE `RepairTypes` (
  `repairID` int(11) NOT NULL,
  `repairName` varchar(45) NOT NULL,
  `cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `RepairTypes`
--

INSERT INTO `RepairTypes` (`repairID`, `repairName`, `cost`) VALUES
(1, 'Galactic Oil Change', 35),
(2, 'Spaceshield Replacement', 50),
(3, 'Landing Gear Fluid Change', 45),
(4, 'Muffler Repair', 30);

-- --------------------------------------------------------

--
-- Table structure for table `Spaceships`
--

CREATE TABLE `Spaceships` (
  `spaceshipID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `spaceshipMake` varchar(45) NOT NULL,
  `spaceshipModel` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Spaceships`
--

INSERT INTO `Spaceships` (`spaceshipID`, `customerID`, `spaceshipMake`, `spaceshipModel`) VALUES
(1, 3, 'Toyoda', 'Spamry'),
(2, 3, 'Jonda', 'Spinsight'),
(3, 2, 'Fjord', 'Fjocus'),
(4, 1, 'Starwagon', 'StarRabbit'),
(5, 1, 'Toyoda', 'Spamry');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `InvoiceDetails`
--
ALTER TABLE `InvoiceDetails`
  ADD KEY `invoiceID` (`invoiceID`),
  ADD KEY `repairID` (`repairID`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoiceID`),
  ADD KEY `spaceshipID` (`spaceshipID`);

--
-- Indexes for table `RepairTypes`
--
ALTER TABLE `RepairTypes`
  ADD PRIMARY KEY (`repairID`);

--
-- Indexes for table `Spaceships`
--
ALTER TABLE `Spaceships`
  ADD PRIMARY KEY (`spaceshipID`),
  ADD KEY `customerID` (`customerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `invoiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RepairTypes`
--
ALTER TABLE `RepairTypes`
  MODIFY `repairID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Spaceships`
--
ALTER TABLE `Spaceships`
  MODIFY `spaceshipID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `InvoiceDetails`
--
ALTER TABLE `InvoiceDetails`
  ADD CONSTRAINT `InvoiceDetails_ibfk_1` FOREIGN KEY (`invoiceID`) REFERENCES `Invoices` (`invoiceID`),
  ADD CONSTRAINT `InvoiceDetails_ibfk_2` FOREIGN KEY (`repairID`) REFERENCES `RepairTypes` (`repairID`);

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`spaceshipID`) REFERENCES `Spaceships` (`spaceshipID`);

--
-- Constraints for table `Spaceships`
--
ALTER TABLE `Spaceships`
  ADD CONSTRAINT `Spaceships_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
