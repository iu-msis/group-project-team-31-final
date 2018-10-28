DROP TABLE IF EXISTS Turbine;

CREATE TABLE Turbine (
  turbineId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  turbineName VARCHAR(100) NOT NULL,
  turbineDescription VARCHAR(250) NOT NULL,
  capacity INT NOT NULL,
  rampUpTime INT NOT NULL,
  maintenanceInterval int NOT NULL
);

INSERT INTO Turbine (turbineId, turbineName, turbineDescription, capacity, rampUpTime, maintenanceInterval)
VALUES (1, '3SA.01', 'The 3SA high efficiency, deep-water tidal turbine is an industry leader among S-class offerings.', 429, 12, 32000);
INSERT INTO Turbine (turbineId, turbineName, turbineDescription, capacity, rampUpTime, maintenanceInterval)
VALUES (2, '3SA.02', 'The 3SA high efficiency, deep-water tidal turbine is an industry leader among H-class offerings.', 519, 12, 32000);
INSERT INTO Turbine (turbineId, turbineName, turbineDescription, capacity, rampUpTime, maintenanceInterval)
VALUES (3, 'W7B.01', 'This high efficiency wind turbine turbine is an industry leader among wind offerings.', 280, 10, 22000);
INSERT INTO Turbine (turbineId, turbineName, turbineDescription, capacity, rampUpTime, maintenanceInterval)
VALUES (4, 'SF9.06', 'An optimum choice for solar power generation, this series of collectors operates at the cutting edge of efficiency.', 82, 29, 42000);

CREATE TABLE TurbineDeployed(
turbineDeployedId	INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
turbineId	INT NOT NULL,
siteId	INT NOT NULL,
serialNumber	VARCHAR(35) NOT NULL,
deployedDate	DATE NOT NULL,
totalFiredHours	INT NOT NULL,
totalStarts	INT NOT NULL,
lastPlannedOutageDate	DATE,
lastUnplannedOutageDate DATE,
FOREIGN KEY TurbineDeployed_FK1 (turbineId) REFERENCES Turbine(turbineId),
FOREIGN KEY TurbineDeployed_FK2 (siteId) REFERENCES Site(siteId)
);
