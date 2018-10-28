DROP TABLE IF EXISTS Sensor;

CREATE TABLE Sensor (
  sensorId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sensorName VARCHAR(100) NOT NULL,
  sensorDescription VARCHAR(250) NOT NULL,
  manufacturer VARCHAR(100) NOT NULL,
  totalLifeExpectancyHours INT NOT NULL
);

INSERT INTO Sensor (sensorId, sensorName, sensorDescription, manufacturer, totalLifeExpectancyHours)
VALUES (1, 'LVDT', 'LVDTs (Linear Variable Differential Transformers) are commonly used as position sensors in power plants throughout the world.' , 'Alliance Sensors Group', 10000);
INSERT INTO Sensor (sensorId, sensorName, sensorDescription, manufacturer, totalLifeExpectancyHours)
VALUES (2, '4L60E', 'Input Shaft Speed Sensor', 'Alliance Sensors Group', 10000);
INSERT INTO Sensor (sensorId, sensorName, sensorDescription, manufacturer, totalLifeExpectancyHours)
VALUES (3, 'BN350300', 'Dynamic Pressure Sensor', 'Bently Nevada', 10000);

DROP TABLE IF EXISTS SensorDeployed;

CREATE TABLE SensorDeployed (
sensorDeployedId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
sensorId	INT NOT NULL,
turbineDeployedId	INT NOT NULL,
serialNumber	VARCHAR(100) NOT NULL,
deployedDate	DATE NOT NULL
);


INSERT INTO SensorDeployed (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
VALUES (1, 1, 1, 'LVDT-IU0001', '2014-03-19');
INSERT INTO SensorDeployed (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
VALUES (2, 2, 2, 'LVDT-IU0002', '2014-06-11');
INSERT INTO SensorDeployed (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
VALUES (3, 3, 1, '4L60E-IU0001', '2015-01-03');
INSERT INTO SensorDeployed (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
VALUES (4, 4, 1, 'BN350300-IU0001', '2016-02-14');



DROP TABLE IF EXISTS SensorTimeSeries;

CREATE TABLE SensorTimeSeries (
sensorDeployedId INT NOT NULL,
dataCollectedDate	 DATETIME NOT NULL,
OutPut VARCHAR(20) NOT NULL,
HeatRate VARCHAR(20) NOT NULL,
CompressorEfficiency VARCHAR(20) NOT NULL,
availability VARCHAR(20) NOT NULL,
reliability	 VARCHAR(20) NOT NULL,
firedHours VARCHAR(20) NOT NULL,
trips	 INT NOT NULL,
starts INT NOT NULL
);


INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (1, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (1, 2016-01-02, 152.6760616, 9732.789007, 91.78536715, 96.99521765, 99.91086561, 18.02466914, 1, 0);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (2, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (2, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (3, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (3, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (4, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
INSERT INTO SensorTimeSeries (sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
VALUES (4, 2016-01-01, 150.7367606, 9840.755145, 91.15157554, 96.6201278, 98.64766206, 16.7855285, 0, 1);
