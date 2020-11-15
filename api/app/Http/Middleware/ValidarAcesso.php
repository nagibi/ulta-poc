<?php

namespace App\Http\Middleware;

use App\Role;
use App\Usuario;
use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Zizaco\Entrust\Entrust;
use Zizaco\Entrust\EntrustRole;

class ValidarAcesso extends BaseMiddleware
{
       public function handle($request, Closure $next, $roles, $permissions=null, $validateAll = false)
    {

        if (! $token = $this->auth->setRequest($request)->getToken()) {
            return $this->unauthorized('Token nao existe', 400);
        }

        try {
            $usuario = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return $this->unauthorized('MSG000269', 401);
        } catch (JWTException $e) {
            return $this->unauthorized('MSG000270', 401);
        }

        if (!$usuario) {
            return $this->unauthorized('MSG000271', 401);
        }

        if (!$request->user()->ability(explode('|',$roles),explode('|',$permissions),['validate_all'=>$validateAll])){
            return $this->unauthorized('MSG000050', 401);
        }
        return $next($request);

    }

    private function unauthorized($message = null, $statusCode=401){
                return response()->json([
                    "status" => "False",
                    "statusCode" => $statusCode,
                    'message' => $message ? $message : 'MSG000050',
                    "erros" => null,
                    "result" => null,
                ], $statusCode);
            }
}
