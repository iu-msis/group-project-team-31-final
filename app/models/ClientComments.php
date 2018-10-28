<?php
class ClientComment
{
  public $commentId;
  public $clientId;
  public $clientName;
  public $comment;

  public function __construct($row) {
    $this->commentId = isset($row['commentId']) ? intval($row['commentId']) : null;
    $this->clientId = intval($row['clientId']);
    $this->clientName = $row['clientName'];
    $this->comment = $row['comment'];
  }

  public function create(){
    $db=new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql='INSERT INTO ClientComments(commentId, clientId, comment)
    VALUES (?,?,?)';
    $statement= $db->prepare($sql);
    $success=$statement->execute([
      $this->commentId,
      $this->clientId,
      $this->comment
    ]);
    $this->commentId = $db->lastInsertId();
  }

  public static function getClientCommentById() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM CommentforClients';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $clientItem =  new ClientComment($row);
      array_push($arr, $clientItem);
    }
    // 4.b. return the array of work objects
    return $arr;
  }
}
