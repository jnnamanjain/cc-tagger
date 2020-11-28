<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Exceptions\AuthException;
use Exceptions\CustomException;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

require '../vendor/autoload.php';


$app->get('/tags' , function(Request $request , Response $response){
    $params = $request->getQueryParams();
    $token = $request->getHeader('Authorization')[0];
    //echo $token;
    if(empty($params))
    {
        $client = new Client();
        $authResponse = $client->get(API_ENDPOINT.'/tags/problems', [
            'headers' => [
            'Authorization' => 'Bearer '.$token,
            'Accept' => 'application/json'
            ]
        ]);
        //echo getType($authResponse->getBody()); 
        //$authResponse = json_decode($authResponse->getBody());
        $data = (($authResponse->getBody()->getContents()));
        //echo $data;
        //echo getType($data);
        $response->getBody()->write($data);
        return $response;
    }
    else
    {
        $tags = $params['filter'];
        //echo $tags;
        $client = new Client();
        $authResponse = $client->get(API_ENDPOINT.'/tags/problems', [
            'query' => [
            'filter' => $tags,
            'limit' => 100
            ],
            'headers' => [
                'Authorization' => 'Bearer '.$token,
                'Accept' => 'application/json'
            ]

        ]);
        $authResponse = json_decode($authResponse->getBody());
        $filteredTags = $authResponse->result->data->content;
        $data = json_encode($filteredTags);
        $response->getBody()->write($data);
        return $response;
        //echo $authResponse->getBody(); 
        
    }
    return $response;
});