DROP TABLE IF EXISTS Site;

CREATE TABLE Site (
  siteId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  clientId INT NOT NULL,
  siteName VARCHAR(100) NOT NULL,
  siteDescription VARCHAR(250) NOT NULL,
  primaryContact VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  commercialDate DATE NOT NULL ,
  addrLine1 VARCHAR(250) NOT NULL,
  addrLine2 VARCHAR(250),
  addrCity VARCHAR(250) NOT NULL,
  addrState VARCHAR(2) NOT NULL,
  addrZip VARCHAR(5) NOT NULL,
  addrCountry VARCHAR(2) NOT NULL,
  FOREIGN KEY Site_FK1 (clientId) REFERENCES Client(clientId)
);

INSERT INTO Site (siteId, clientId, siteName, siteDescription, primaryContact,
  capacity, commercialDate, addrLine1, addrLine2, addrCity,
  addrState, addrZip, addrCountry)
VALUES (1,	2,	'Emerald Waters Plant',	'The Emereald Waters Plant is a tidal
  field located at the mouth of the Columbia River, several miles west of Vancouver,
  Washington. Emerald Waters'' first unit began commercial service in 1994, and
  its second unit followed in 1998.', 'John X',	1011,	1/1/74,	'1729 Ocean Bluff Road',
  NULL,	'Brownsmead',	'OR',	97103, 'US');
INSERT INTO Site (siteId, clientId, siteName, siteDescription, primaryContact,
  capacity, commercialDate, addrLine1, addrLine2, addrCity,
  addrState, addrZip, addrCountry)
VALUES (2,	2,	'Smith Energy Complex',	'The Jingleheimer Smith Jr. Energy
  Complex, south of Snowflake, AZ, includes five large solar fields that generate
  1,084 MW. The site began commercial operation in 2001, with additions in 2002
  and 2011.', 'Jean X',	1084,	1/1/01,	'328 Energy Way',
  NULL,	'Snowflake',	'AZ',	85937, 'US');
INSERT INTO Site (siteId, clientId, siteName, siteDescription, primaryContact,
  capacity, commercialDate, addrLine1, addrLine2, addrCity,
  addrState, addrZip, addrCountry)
VALUES (3,	2,	'King County Farm',	'The 520-megawatt King County Wind Farm
  consists of five fields of wind turbine units, and is part of the Tesla Energy
  Complex near Saphire Lake, Iowa. The plant began operation in 2000 with an
  addition in 2009.', 'Jean X',	863,	1/1/00,	'807 Green Field Rd',
  NULL,	'Titonka',	'IA',	50480, 'US');
