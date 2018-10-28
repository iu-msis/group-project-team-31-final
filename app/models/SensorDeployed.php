<?php
class SensorDeployed
{

  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;  //'YYYY-MM-DD'
  public $deployedDate;



  public function __construct($row) {
    $this->sensorDeployedId = isset($row['sensorDeployedId']) ? intval($row['sensorDeployedId']) : null;
    $this->sensorId = intval($row['sensorId']);
    $this->turbineDeployedId = intval($row['turbineDeployedId']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
  }

  public function create(){
    $db=new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql='INSERT INTO SensorDeployed(sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
    VALUES (?,?,?,?,?)';
    $statement= $db->prepare($sql);
    $success=$statement->execute([
      $this->sensorDeployedId,
      $this->sensorId,
      $this->turbineDeployedId,
      $this->serialNumber,
      $this->deployedDate
    ]);
    $this->sensorDeployedId = $db->lastInsertId();
  }
  public static function getSensorDepById(int $turbineId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM SensorDeployed WHERE turbineDeployedId in (select turbineDeployedId from TurbineDeployed
    where turbineId = ?)';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
        [$turbineId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorItem =  new SensorDeployed($row);
      array_push($arr, $sensorItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
