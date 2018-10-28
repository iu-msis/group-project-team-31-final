<?php
class SensorTimeSeries
{
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $OutPut;
  public $HeatRate;  //'YYYY-MM-DD'
  public $CompressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;
  public $sensorId;

  public function __construct($row) {
    $this->sensorDeployedId = isset($row['sensorDeployedId']) ? intval($row['sensorDeployedId']) : null;
    $this->dataCollectedDate = $row['dataCollectedDate'];
    $this->OutPut = $row['OutPut'];
    $this->HeatRate = $row['HeatRate'];
    $this->CompressorEfficiency = $row['CompressorEfficiency'];
    $this->availability = $row['availability'];
    $this->reliability = $row['reliability'];
    $this->firedHours = intval ($row['firedHours']);
    $this->trips = intval ($row['trips']);
    $this->starts = intval ($row['starts']);
  }

  public function create(){
    $db=new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql='INSERT INTO SensorTimeSeries(sensorDeployedId, dataCollectedDate, OutPut, HeatRate, CompressorEfficiency, availability, reliability, firedHours, trips, starts)
    VALUES (?,?,?,?,?,?,?,?,?,?)';
    $statement= $db->prepare($sql);
    $success=$statement->execute([
      $this->sensorDeployedId,
      $this->dataCollectedDate,
      $this->OutPut,
      $this->HeatRate,
      $this->CompressorEfficiency,
      $this->availability,
      $this->reliablity,
      $this->firedHours,
      $this->trips,
      $this->starts
    ]);
    $this->sensorDeployedId = $db->lastInsertId();
  }
  public static function getSensorTimeById(int $sensorId, int $turbineId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'select * from SensorTimeSeries where sensorDeployedId in
      (select sensorDeployedId from SensorDeployed where sensorId = ? and turbineDeployedId in
      (select turbineDeployedId from TurbineDeployed where turbineId = ?))';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(array($sensorId,$turbineId));
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorItem =  new SensorTimeSeries($row);
      array_push($arr, $sensorItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
