<?php
class Sensor
{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;  //'YYYY-MM-DD'
  public $totalLifeExpectancyHours;   //'YYYY-MM-DD', needs to be calculated


  public function __construct($row) {
    $this->sensorId = isset($row['sensorId']) ? intval($row['sensorId']) : null;
    $this->sensorName = $row['sensorName'];
    $this->sensorDescription = $row['sensorDescription'];
    $this->manufacturer = ($row['manufacturer']);
    $this->totalLifeExpectancyHours = intval($row['totalLifeExpectancyHours']);

  }

  public function create(){
    $db=new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql='INSERT INTO Sensor(sensorId, sensorName, sensorDescription, manufacturer, totalLifeExpectancyHours)
    VALUES (?,?,?,?,?)';
    $statement= $db->prepare($sql);
    $success=$statement->execute([
      $this->sensorId,
      $this->sensorName,
      $this->sensorDescription,
      $this->manufacturer,
      $this->totalLifeExpectancyHours,
    ]);
    $this->sensorId = $db->lastInsertId();
  }

  public static function getAllSensor() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM Sensor';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorItem =  new Sensor($row);
      array_push($arr, $sensorItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }

  public static function getSensorById(int $sensorId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM Sensor WHERE SensorId = ?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
        [$sensorId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorItem =  new Sensor($row);
      array_push($arr, $sensorItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
