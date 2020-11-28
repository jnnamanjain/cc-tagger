<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

function generateRandomStr()
{
    $length = 20;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$app->get('/login' , function (Request $request , Response $response){

    $randomString = generateRandomStr();
    //echo "-----------------------------------------------------------";
    $qryData = [
        'response_type' => 'code',
        'client_id' => CLIENT_ID,
        'state' => $randomString,
        'redirect_uri' => REDIRECT_URI

    ];
    $urlOauth = urldecode(AUTHORIZATION_CODE_ENDPOINT.'?'.http_build_query($qryData));
    //echo $response->withStatus(300)->withHeader('Location',$urlOauth);
    return $response->withStatus(302)->withHeader('Location',$urlOauth);
});