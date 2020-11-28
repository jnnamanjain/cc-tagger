<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


$app->post('/addtags' , function(Request $request , Response $response){
    $user_name = $request->getParsedBody()['user_name'];
    $tagsToBeAdded = $request->getParsedBody()['tags'];
    $question_code = $request->getParsedBody()['question_code'];
    $question_tittle = $request->getParsedBody()['question_tittle'];
    $author = $request->getParsedBody()['author'];




    $tags = explode(',',$tagsToBeAdded);
    $usedb = "use codechef";
    
    try {
        $db = new db();
        $db = $db->connect();
        $db->query($usedb);
        $sql_for_problem = "insert ignore into problems (`question_code`, `question_tittle`, `author`) values ( '$question_code' , '$question_tittle' , '$author' ) ";
        $db->query($usedb);
        $db->query($sql_for_problem);
        foreach($tags as $tag)
        {
            $sql = "insert ignore into user_tag_map (`username`, `tag`, `question_code` ,`type`) values ('$user_name' , '$tag' , '$question_code' , 'user-defined') ";
            $db->query($sql);
        }
    } catch(PDOException $e)
    {
        echo $e->getMessage();
    }
        
    
    return $response;
});