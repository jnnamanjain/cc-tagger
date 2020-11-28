<?php

class db{
    // props
    private $dbhost = 'localhost';
    private $port = '3306';
    private $dbuser = 'root';
    private $dbpass = '';

    // connect
    public function connect() {

       $mysql_connect_str = "mysql:host=$this->dbhost; port = $this->port";
       $dbConnection = new PDO($mysql_connect_str,$this->dbuser , $this->dbpass);
       $dbConnection->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);
       return $dbConnection;
   }


}