<?php

use App\Mail\newEnviarEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*****************
 * Global
 *****************/

Route::get('enums/sim-nao', 'EnumController@simNao');
Route::get('enums/tipo-documento', 'EnumController@tipoDocumento');
Route::get('enums/tipo-arquivo', 'EnumController@tipoArquivo');
Route::get('enums/sexo', 'EnumController@sexo');
Route::get('enums/status', 'EnumController@status');
Route::get('enums/status-documento', 'EnumController@statusDocumento');

/*****************
 * Usuarios
 *****************/

Route::group(['middleware' => 'validar-acesso:admin'], function () {

    Route::get('usuarios', 'UsuarioController@pesquisar');
    Route::get('usuarios/total','UsuarioController@total');
    Route::get('usuarios/{id}', 'UsuarioController@obter');
    Route::get('usuarios/{id}/nome','UsuarioController@nome');
    Route::post('usuarios', 'UsuarioController@cadastrar');
    Route::put('usuarios/{id}', 'UsuarioController@atualizar');
    // Route::match(['put','get'],['usuarios/{id}', 'UsuarioController@atualizar']);
    Route::put('usuarios/{id}/status','UsuarioController@status');
    Route::post('usuarios/{id}/grupos','UsuarioController@grupo');
    Route::delete('usuarios/{id}','UsuarioController@deletar');

});

/*****************
 * Documento
 *****************/

Route::group(['middleware' => 'validar-acesso:admin|edit'], function () {

    Route::get('documentos', 'DocumentoController@pesquisar');
    Route::get('documentos/total','DocumentoController@total');
    Route::get('documentos/{id}', 'DocumentoController@obter');
    Route::post('documentos', 'DocumentoController@cadastrar');
    Route::get('documentos/{id}/nome','DocumentoController@nome');
    Route::put('documentos/{id}', 'DocumentoController@atualizar');
    Route::put('documentos/{id}/status','DocumentoController@status');
    Route::delete('documentos/{id}','DocumentoController@deletar');

});

/*****************
 * Faturamento
 *****************/

Route::group(['middleware' => 'validar-acesso:admin|edit'], function () {

    Route::get('faturamentos', 'FaturamentoController@pesquisar');
    Route::get('documentos/{id}/faturamentos', 'FaturamentoController@pesquisar');
    Route::get('faturamentos/total','FaturamentoController@total');
    Route::get('faturamentos/{id}', 'FaturamentoController@obter');
    Route::post('faturamentos', 'FaturamentoController@cadastrar');
    Route::put('faturamentos/{id}', 'FaturamentoController@atualizar');
    Route::put('faturamentos/{id}/status','FaturamentoController@status');
    Route::delete('faturamentos/{id}','FaturamentoController@deletar');

});

/*****************
 * Demonstrativo de Faturamento
 *****************/

Route::group(['middleware' => 'validar-acesso:admin|edit'], function () {

    Route::get('demonstrativo-faturamentos', 'DemonstrativoFaturamentoController@pesquisar');
    Route::get('documentos/{id}/demonstrativo-faturamentos', 'DemonstrativoFaturamentoController@pesquisar');
    Route::get('demonstrativo-faturamentos/total','DemonstrativoFaturamentoController@total');
    Route::get('demonstrativo-faturamentos/{id}', 'DemonstrativoFaturamentoController@obter');
    Route::post('demonstrativo-faturamentos', 'DemonstrativoFaturamentoController@cadastrar');
    Route::put('demonstrativo-faturamentos/{id}', 'DemonstrativoFaturamentoController@atualizar');
    Route::put('demonstrativo-faturamentos/{id}/status','DemonstrativoFaturamentoController@status');
    Route::delete('demonstrativo-faturamentos/{id}','DemonstrativoFaturamentoController@deletar');

});

/*****************
 * Grupos
 *****************/

Route::group(['middleware' => 'validar-acesso:admin'], function () {

    Route::get('grupos', 'GrupoController@pesquisar');
    Route::get('grupos/total','GrupoController@total');
    Route::get('grupos/{id}', 'GrupoController@obter');
    Route::get('grupos/{id}/nome','GrupoController@nome');
    Route::post('grupos', 'GrupoController@cadastrar');
    Route::put('grupos/{id}', 'GrupoController@atualizar');
    Route::put('grupos/{id}/status','GrupoController@status');
    Route::post('grupos/{id}/funcoes','GrupoController@grupo');
    Route::delete('grupos/{id}','GrupoController@deletar');

});

/*****************
 * Auth
 *****************/

Route::group(['middleware' => 'validar-acesso:teste|teste,usuario-cadastrar'], function () {

    Route::get('auth/permissoes', 'AuthController@permissoes');
    Route::post('auth/logout', 'AuthController@logout');

});


Route::post('auth/cadastrar', 'AuthController@cadastrar');;

Route::post('auth/login', 'AuthController@login');;

Route::get('auth/confirmar-email/{token}', 'AuthController@confirmarEmail');;

Route::post('auth/resetar-senha', 'AuthController@resetarSenha');

Route::post('auth/role', 'AuthController@createRole');

Route::post('auth/permission', 'AuthController@createPermission');

Route::post('auth/assign-role', 'AuthController@assignRole');

Route::post('auth/attach-permission', 'AuthController@attachPermission');

/*** */
