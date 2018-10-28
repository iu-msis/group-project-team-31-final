<?php
class TurbineDeployed
{

  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;  //'YYYY-MM-DD'
  public $deployedDate;   //'YYYY-MM-DD', needs to be calculated
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;

  public function __construct($row) {
    $this->turbineDeployedId = isset($row['turbineDeployedId']) ? intval($row['turbineDeployedId']) : null;
    $this->turbineId = intval($row['turbineId']);
    $this->siteId = intval($row['siteId']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
    $this->totalFiredHours = intval($row['totalFiredHours']);
    $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
  }

  public function create(){
    $db=new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql='INSERT INTO TurbineDeployed(turbineDeployedId, turbineId, siteId, serialNumber, deployedDate, totalFiredHours, totalStarts, lastPlannedOutageDate, lastUnplannedOutageDate)
    VALUES (?,?,?,?,?,?,?,?,?)';
    $statement= $db->prepare($sql);
    $success=$statement->execute([
      $this->turbineDeployedId,
      $this->turbineId,
      $this->siteId,
      $this->serialNumber,
      $this->deployedDate,
      $this->totalFiredHours,
      $this->totalStarts,
      $this->lastPlannedOutageDate,
      $this->lastUnplannedOutageDate
    ]);
    $this->turbineDeployedId = $db->lastInsertId();
  }
  public static function getTurbineDepById(int $turbineId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM TurbineDeployed WHERE turbineId = ?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
        [$turbineId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $turbineItem =  new TurbineDeployed($row);
      array_push($arr, $turbineItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
