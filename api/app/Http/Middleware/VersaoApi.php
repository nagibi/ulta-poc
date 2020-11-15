<?php

namespace App\Http\Middleware;

use Closure;

class VersaoApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard)
    {
        config(['app.versao.api' => $guard]);
        return $next($request);
    }
}
