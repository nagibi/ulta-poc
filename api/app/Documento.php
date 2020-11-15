<?php

namespace App;

use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Documento extends Model
{
    use ValidatesRequests;

    const CREATED_AT = 'dataCriacao';
    const UPDATED_AT = 'dataAtualizacao';    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'nomeOriginal', 'tipo','caminho','extensao','status','usuarioCriacaoId','usuarioAtualizacaoId','dataCriacao','dataAtualizacao'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

}
