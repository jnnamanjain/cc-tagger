<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Factory\AppFactory;
use Exceptions\AuthException;
use Exceptions\CustomException;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;
use Slim\Routing\RouteCollectorProxy;
use Slim\Routing\RouteContext;

require '../vendor/autoload.php';
require '../src/config/db.php';

session_start();

define("CLIENT_ID","a21a8066ef495b64514b40b9796ddfe7");
define("CLIENT_SECRET","4c227cfd7967d89ce2fd8750347aa39c");
define("API_ENDPOINT", "https://api.codechef.com");
define("AUTHORIZATION_CODE_ENDPOINT","https://api.codechef.com/oauth/authorize");
define("TOKEN_ENDPOINT","https://api.codechef.com/oauth/token");
define("REDIRECT_URI","http://localhost:3000/");
define("WEBSITE_BASE_URL", "http://localhost:3000/");

$app = AppFactory::create();
$app->setBasePath('/Codechef Backend/public/index.php');
  
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}

// return HTTP 200 for HTTP OPTIONS requests
/*$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],'', function($x) {
    http_response_code(200);
})->via('OPTIONS');*/

require '../src/routes/Login.php';
require '../src/routes/Authorize.php';
require '../src/routes/PublicToken.php';
require '../src/routes/Tags.php';
require '../src/routes/UserTags.php';
require '../src/routes/addtags.php';




$app->run();





