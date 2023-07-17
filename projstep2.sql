SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- test

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_gullot
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_gullot
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cs340_gullot` DEFAULT CHARACTER SET utf8 ;
USE `cs340_gullot` ;

-- -----------------------------------------------------
-- Table `cs340_gullot`.`Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gullot`.`Customers` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `customerName` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE INDEX `customerID_UNIQUE` (`customerID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gullot`.`Spaceships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gullot`.`Spaceships` (
  `spaceshipID` INT NOT NULL AUTO_INCREMENT,
  `spaceshipMake` VARCHAR(45) NOT NULL,
  `spaceshipModel` VARCHAR(45) NOT NULL,
  `customerID` INT NOT NULL,
  PRIMARY KEY (`spaceshipID`, `customerID`),
  UNIQUE INDEX `spaceshipID_UNIQUE` (`spaceshipID` ASC) VISIBLE,
  INDEX `fk_Spaceships_Customers_idx` (`customerID` ASC) VISIBLE,
  CONSTRAINT `fk_Spaceships_Customers`
	FOREIGN KEY (`customerID`)
	REFERENCES `cs340_gullot`.`Customers` (`customerID`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gullot`.`Invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gullot`.`Invoices` (
  `invoiceID` INT NOT NULL AUTO_INCREMENT,
  `cost` INT NOT NULL,
  `spaceshipID` INT NOT NULL,
  PRIMARY KEY (`invoiceID`, `spaceshipID`),
  UNIQUE INDEX `invoiceID_UNIQUE` (`invoiceID` ASC) VISIBLE,
  INDEX `fk_Invoices_Spaceships1_idx` (`spaceshipID` ASC) VISIBLE,
  CONSTRAINT `fk_Invoices_Spaceships1`
	FOREIGN KEY (`spaceshipID`)
	REFERENCES `cs340_gullot`.`Spaceships` (`spaceshipID`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gullot`.`RepairTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gullot`.`RepairTypes` (
  `repairID` INT NOT NULL AUTO_INCREMENT,
  `repairName` VARCHAR(45) NOT NULL,
  `cost` INT NOT NULL,
  PRIMARY KEY (`repairID`),
  UNIQUE INDEX `repairID_UNIQUE` (`repairID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gullot`.`InvoiceDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gullot`.`InvoiceDetails` (
  `invoiceID` INT NOT NULL,
  `repairID` INT NOT NULL,
  PRIMARY KEY (`invoiceID`, `repairID`),
  INDEX `fk_InvoiceDetails_RepairTypes1_idx` (`repairID` ASC) VISIBLE,
  CONSTRAINT `fk_InvoiceDetails_Invoices1`
	FOREIGN KEY (`invoiceID`)
	REFERENCES `cs340_gullot`.`Invoices` (`invoiceID`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT `fk_InvoiceDetails_RepairTypes1`
	FOREIGN KEY (`repairID`)
	REFERENCES `cs340_gullot`.`RepairTypes` (`repairID`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

/* add test data to Customers*/
INSERT INTO `cs340_gullot`.`Customers` (`customerName`, `telephone`)
VALUES 
('Regina', '99-123-456-7890'),
('George', '12-156-184-4452'),
('Lee', '55-856-155-4154');

/* add test data to Spaceships */
INSERT INTO `cs340_gullot`.`Spaceships` (`spaceshipMake`, `spaceshipModel`, `customerID`)
VALUES 
('Toyoda', 'Spamry', '3'),
('Jonda', 'Spinsight', '3'),
('Fjord', 'Fjocus', '2'),
('Starwagon', 'StarRabbit', '1'),
('Toyoda', 'Spamry', '1');

/* add test data to RepairTypes */
INSERT INTO `cs340_gullot`.`RepairTypes` (`repairName`, `cost`)
VALUES 
('Galactic Oil Change', '35'),
('Spaceshield Replacement', '50'),
('Landing Gear Fluid Change', '45'),
('Muffler Repair', '30');

/* add test data to Invoices */
INSERT INTO `cs340_gullot`.`Invoices` (`cost`, `spaceshipID`)
VALUES
('85', '2'),
('95', '3'),
('30', '5');

/* add test data to InvoiceDetails */
INSERT INTO `cs340_gullot`.`InvoiceDetails` (`invoiceID`, `repairID`)
VALUES
('1', '1'),
('1', '2'),
('2', '2'),
('2', '3'),
('3', '4');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;