<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


$app->post('/usertags' , function(Request $request , Response $response){
    $params = $request->getQueryParams();
    //var_dump($request);
    //print_r($request->getParsedBody());
    //echo "------------";
    //echo $request->getBody()->getContents();
    $user_name = json_decode($request->getBody()->getContents())->user_name;
    //echo $user_name;
    if(empty($params))
    {
        $sql = "SELECT tag ,COUNT(question_code) as count,type FROM user_tag_map WHERE username='$user_name' GROUP BY tag;";
        $usedb = "use codechef";
        
        try {
            $db = new db();
            $db = $db->connect();
            $db->query($usedb);
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $response->getBody()->write(json_encode($data));
        } catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        
    }
    else {
        $tags = explode(',',($params['filter']));
        $tags_str="";
        foreach($tags as $tag)
        {
            //echo $tag;
            $tags_str=$tags_str."'".$tag."',";
        }
        $tags_str = rtrim($tags_str, ',');
        $sql = "SELECT  GROUP_CONCAT(tag), question_code FROM user_tag_map WHERE username='$user_name' AND tag IN ($tags_str) GROUP BY question_code";
        $usedb = "use codechef";
        
        try {
            $db = new db();
            $db = $db->connect();
            $db->query($usedb);
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            //$db=null;
            //echo $data;
            $response->getBody()->write(json_encode($data));
        } catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        
    }
    return $response;
});