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



$app->get('/authorize' , function(Request $request , Response $response){
    $authcode = $request->getHeader('AuthCode')[0];
    $client = new Client();

    try{
    $authResponse = $client->post(TOKEN_ENDPOINT, [
        'json' => [
            "grant_type" => "authorization_code" ,
            "code" => $authcode, 
            "client_id" => CLIENT_ID,
            "client_secret" => CLIENT_SECRET,
            "redirect_uri" => REDIRECT_URI
        ],
        'header' => [
            'Content-Type' => 'application/json'
        ]
    ]);
    } catch(BadResponseException $e)
    {
        //echo '\n';
        echo ($e->getResponse()->getBody()->getContents());
        //echo '---------';
    }
    //echo $authResponse->getBody();
    //var_dump($authResponse);
    $authResponse = json_decode($authResponse->getBody());
    //echo $authResponse;
    $tokenData = [
        'access_token' => $authResponse->result->data->access_token,
        'refresh_token' => $authResponse->result->data->refresh_token
    ];
    $finalData = json_encode($tokenData);
    $response->getBody()->write($finalData);
    return $response;
    
});