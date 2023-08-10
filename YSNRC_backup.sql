-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_gullot
-- ------------------------------------------------------
-- Server version	10.6.14-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Regina','99-123-456-7890'),(2,'George','12-156-184-4452'),(3,'Lee','55-856-155-4154');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvoiceDetails`
--

DROP TABLE IF EXISTS `InvoiceDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvoiceDetails` (
  `invoiceID` int(11) NOT NULL,
  `repairID` int(11) NOT NULL,
  PRIMARY KEY (`invoiceID`,`repairID`),
  KEY `fk_InvoiceDetails_RepairTypes1_idx` (`repairID`),
  CONSTRAINT `fk_InvoiceDetails_Invoices1` FOREIGN KEY (`invoiceID`) REFERENCES `Invoices` (`invoiceID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_InvoiceDetails_RepairTypes1` FOREIGN KEY (`repairID`) REFERENCES `RepairTypes` (`repairID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvoiceDetails`
--

LOCK TABLES `InvoiceDetails` WRITE;
/*!40000 ALTER TABLE `InvoiceDetails` DISABLE KEYS */;
INSERT INTO `InvoiceDetails` VALUES (1,1),(1,2),(2,2),(2,3),(3,4);
/*!40000 ALTER TABLE `InvoiceDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoices`
--

DROP TABLE IF EXISTS `Invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `cost` int(11) NOT NULL,
  `spaceshipID` int(11) NOT NULL,
  PRIMARY KEY (`invoiceID`,`spaceshipID`),
  UNIQUE KEY `invoiceID_UNIQUE` (`invoiceID`),
  KEY `fk_Invoices_Spaceships1_idx` (`spaceshipID`),
  CONSTRAINT `fk_Invoices_Spaceships1` FOREIGN KEY (`spaceshipID`) REFERENCES `Spaceships` (`spaceshipID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoices`
--

LOCK TABLES `Invoices` WRITE;
/*!40000 ALTER TABLE `Invoices` DISABLE KEYS */;
INSERT INTO `Invoices` VALUES (1,85,2),(2,95,3),(3,30,5);
/*!40000 ALTER TABLE `Invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RepairTypes`
--

DROP TABLE IF EXISTS `RepairTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RepairTypes` (
  `repairID` int(11) NOT NULL AUTO_INCREMENT,
  `repairName` varchar(45) NOT NULL,
  `cost` int(11) NOT NULL,
  PRIMARY KEY (`repairID`),
  UNIQUE KEY `repairID_UNIQUE` (`repairID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RepairTypes`
--

LOCK TABLES `RepairTypes` WRITE;
/*!40000 ALTER TABLE `RepairTypes` DISABLE KEYS */;
INSERT INTO `RepairTypes` VALUES (1,'Galactic Oil Change',35),(2,'Spaceshield Replacement',50),(3,'Landing Gear Fluid Change',45),(4,'Muffler Repair',30);
/*!40000 ALTER TABLE `RepairTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Spaceships`
--

DROP TABLE IF EXISTS `Spaceships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Spaceships` (
  `spaceshipID` int(11) NOT NULL AUTO_INCREMENT,
  `spaceshipMake` varchar(45) NOT NULL,
  `spaceshipModel` varchar(45) NOT NULL,
  `customerID` int(11) NOT NULL,
  PRIMARY KEY (`spaceshipID`,`customerID`),
  UNIQUE KEY `spaceshipID_UNIQUE` (`spaceshipID`),
  KEY `fk_Spaceships_Customers_idx` (`customerID`),
  CONSTRAINT `fk_Spaceships_Customers` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Spaceships`
--

LOCK TABLES `Spaceships` WRITE;
/*!40000 ALTER TABLE `Spaceships` DISABLE KEYS */;
INSERT INTO `Spaceships` VALUES (1,'Toyoda','Spamry',3),(2,'Jonda','Spinsight',3),(3,'Fjord','Fjocus',2),(4,'Starwagon','StarRabbit',1),(5,'Toyoda','Spamry',1);
/*!40000 ALTER TABLE `Spaceships` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-09 20:04:25
