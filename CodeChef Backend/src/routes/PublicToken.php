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
use GuzzleHttp\Exception\ClientException;


$app->get('/publictoken' , function(Request $request , Response $response){

    $client = new  Client();
    $authResponse = $client->post(TOKEN_ENDPOINT, [
        'json' => [
            "grant_type" => "client_credentials" ,
            "scope" => "public", 
            "client_id" => CLIENT_ID,
            "client_secret" => CLIENT_SECRET,
            "redirect_uri" => REDIRECT_URI
        ]
    ]);
    //echo $authResponse->getBody();
    $authResponse = json_decode($authResponse->getBody());

    $access_token = $authResponse->result->data->access_token;
    $tokenData = [
        'public_token' => $access_token
    ];
    $access_token = json_encode($tokenData);
    //echo $access_token ;
    //echo $access_token;
    $response->getBody()->write($access_token);
    return $response;
});