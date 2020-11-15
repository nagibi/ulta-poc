<?php

namespace App;

use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Foundation\Validation\ValidatesRequests;
// Please add this line
use Tymon\JWTAuth\Contracts\JWTSubject;
use Zizaco\Entrust\Traits\EntrustUserTrait;

// Please implement JWTSubject interface
// class User extends Authenticatable implements JWTSubject
class Usuario extends Authenticatable implements JWTSubject
{
    use CanResetPassword, EntrustUserTrait, ValidatesRequests;
    
    const CREATED_AT = 'dataCriacao';
    const UPDATED_AT = 'dataAtualizacao';    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'email', 'password','status','usuarioCriacaoId','usuarioAtualizacaoId','dataCriacao','dataAtualizacao'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime',
    ];

    // Please ADD this two methods at the end of the class
  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
    return [];
  }


}
