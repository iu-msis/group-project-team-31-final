DROP TABLE IF EXISTS Client;

CREATE TABLE Client (
  clientId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  clientName VARCHAR(100) NOT NULL,
  clientDescription VARCHAR(500) NOT NULL,
  gicsSector VARCHAR(100) NOT NULL,
  gicsSubIndustry VARCHAR(100) NOT NULL,
  headquarters VARCHAR(100) NOT NULL,
  Comment VARCHAR(100) NOT NULL,
);

INSERT INTO Turbine (clientId, clientName, clientDescription, gicsSector, gicsSubIndustry, headquarters)
VALUES (1, 'Hoosier Energy', 'Hoosier Energy is a generation and transmission cooperative providing wholesale electric wind power and services to 18 member distribution cooperatives in central and southern Indiana and southeastern Illinois. Based in Bloomington, Indiana, Hoosier Energy operates renewable energy power plants and delivers power through nearly 1700 miles of transmission network.', 'Energy', 'Energy Production', 'Bloomington, IN');
INSERT INTO Turbine (clientId, clientName, clientDescription, gicsSector, gicsSubIndustry, headquarters)
VALUES (2, 'Pacific Tidal Energy', 'Pacfiic Tidal Energy makes life better for millions of people every day by providing sustainable tidal energy generation services â€“ affordable, reliable and clean. Pacific Tidal is the largest tidal electric power holding company in the United States, supplying and delivering energy through local utilities to approximately 7.4 million U.S. customers.', 'Energy', 'Energy Service', 'Charlotte, NC');
