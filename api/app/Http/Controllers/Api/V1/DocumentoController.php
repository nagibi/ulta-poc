<?php

namespace App\Http\Controllers\Api\v1;

use App\DemonstrativoFaturamento;
use App\Documento;
use App\Faturamento;
use App\Demo;
use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth as JWTAuth;

class DocumentoController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function total()
    {
        $total = Documento::all()->count();
        return $this->response(200, "MSG000151", $total);
    }

    public function pesquisar(Request $request)
    {
        $qtdRegistros = is_null($request->qtdRegistros) || $request->qtdRegistros == -1 ? 999999999999999 : $request->qtdRegistros;
        $pageCurrent = $request->get('pageCurrent');
        $orderBy = is_null($request->orderBy) ? 'id' : $request->orderBy;
        $orderType = is_null($request->orderType) ? 'desc' : $request->orderType;
        $query = Documento::query();

        //nome
        if (!is_null($request->get('nome'))) {
            $query = $query->where('documentos.nome', 'like', '%' . $request->get('nome') . '%');
        }

        //nomeOriginal
        if (!is_null($request->get('nomeOriginal'))) {
            $query = $query->where('documentos.nomeOriginal', 'like', '%' . $request->get('nomeOriginal') . '%');
        }

        //id
        if (!is_null($request->get('id'))) {
            $query = $query->where('documentos.id', '=', $request->get('id'));
        }

        //caminho
        if (!is_null($request->get('caminho'))) {
            $query = $query->where('caminho', (boolean) json_decode(strtolower($request->get('caminho'))));
        }

        //extensao
        if (!is_null($request->get('status'))) {
            $query = $query->where('status', '=', $request->get('status'));
        }

        //tipo
        if (!is_null($request->get('tipo'))) {
            $query = $query->where('tipo', '=', $request->get('tipo'));
        }

        //extensao
        if (!is_null($request->get('extensao'))) {
            $query = $query->where('extensao', (boolean) json_decode(strtolower($request->get('extensao'))));
        }

        //dataCriacao
        $dataCriacaoInicial = $request->get('dataCriacaoInicial');
        $dataCriacaoFinal = $request->get('dataCriacaoFinal');

        if (!is_null(($dataCriacaoInicial)) || !is_null(($dataCriacaoFinal))) {

            if (!is_null(($dataCriacaoInicial))) {
                $inicial = Carbon::parse($dataCriacaoInicial);
                $query = $query->where('created_at', ">=", $inicial);
            }

            if (!is_null(($dataCriacaoFinal))) {

                $final = Carbon::parse($dataCriacaoFinal)->endOfDay();
                $query = $query->where('created_at', "<=", $final);
            }
        }

        //dataCriacao
        $dataAtualizacaoInicial = $request->get('dataAtualizacaoInicial');
        $dataAtualizacaoFinal = $request->get('dataAtualizacaoFinal');

        if (!is_null(($dataAtualizacaoInicial)) || !is_null(($dataAtualizacaoFinal))) {

            if (!is_null(($dataAtualizacaoInicial))) {
                $inicial = Carbon::parse($dataAtualizacaoInicial);
                $query = $query->where('updated_at', ">=", $inicial);
            }

            if (!is_null(($dataAtualizacaoFinal))) {

                $final = Carbon::parse($dataAtualizacaoFinal)->endOfDay();
                $query = $query->where('updated_at', "<=", $final);
            }
        }

        $totalRecordsFilter = $query->get()->Count();

        $records = $query
            ->orderBy($orderBy, $orderType)
            ->select('documentos.*')
            ->skip($pageCurrent)
            ->take($qtdRegistros)
            ->get();

        $data_arr = array();
        foreach ($records as $record) {
            $id = $record->id;
            $nome = $record->nome;
            $nomeOriginal = $record->nomeOriginal;
            $tipo = $record->tipo;
            $caminho = $record->caminho;
            $extensao = $record->extensao;
            $status = $record->status;
            $confirmacaoEmail = $record->confirmacaoEmail;
            $dataCriacao = $record->dataCriacao;
            $dataAtualizacao = $record->dataAtualizacao;

            $data_arr[] = array(
                "id" => $id,
                "nome" => $nome,
                "nomeOriginal" => $nomeOriginal,
                "tipo" => $tipo,
                "caminho" => $caminho,
                "extensao" => $extensao,
                "status" => $status,
                "confirmacaoEmail" => $confirmacaoEmail,
                "dataCriacao" => $dataCriacao,
                "dataAtualizacao" => $dataAtualizacao,
            );
        }

        return $this->response(200, "MSG000151", ['total' => $totalRecordsFilter, 'data' => $data_arr]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function cadastrar(Request $request)
    {
        try {


            // DB::transaction(function () use ($request) {

                if ($request->hasFile('file')) {

                    foreach ($request->file('file') as $file) {

                        if ($file->isValid()) {
                            
                            $radon = rand(1,10);

                            $isPar = ($radon % 2 == 0);

                            $extensao = $file->getClientOriginalExtension();
                            $nome = time() . Str::random(5) . '.' . $file->getClientOriginalExtension();
                            $nomeOriginal = $file->getClientOriginalName();
                            $destination = 'documentos';
                            $file->move($destination, $nome);

                            $documento = new Documento();
                            $documento->nome = $nome;
                            $documento->nomeOriginal = $nomeOriginal;
                            $documento->tipo = $request->tipo;
                            $documento->caminho = $destination;
                            $documento->extensao = $extensao;
                            $documento->status = $isPar == true ? 2 : 0;
                            $documento->usuarioCriacaoId = JWTAuth::user()->id;
                            $documento->usuarioAtualizacaoId = JWTAuth::user()->id;
                            $documento->save();

                            if($isPar){

                                if($documento->tipo  == 0){

                                    for ($i=0; $i < $radon; $i++) { 
                                        $faturamento = new Faturamento();
                                        $faturamento->descricao = md5(date("d/m/Y H:i:s"));
                                        $faturamento->valor = rand(1,10000);
                                        $faturamento->codigo = $radon;
                                        $faturamento->data = Carbon::parse(date("Y-m-d", mt_rand(1, time())));
                                        $faturamento->documentoId = $documento->id;
                                        $faturamento->usuarioCriacaoId = JWTAuth::user()->id;
                                        $faturamento->usuarioAtualizacaoId = JWTAuth::user()->id;
                                        $faturamento->save();
                                    }
    
                                }else{
                                    for ($i=0; $i < $radon; $i++) { 
                                        $demonstrativoFaturamento = new DemonstrativoFaturamento();
                                        $demonstrativoFaturamento->descricao = md5(date("d/m/Y H:i:s"));
                                        $demonstrativoFaturamento->valor = rand(1,10000);
                                        $demonstrativoFaturamento->codigo = $radon;
                                        $demonstrativoFaturamento->data = Carbon::parse(date("Y-m-d", mt_rand(1, time())));
                                        $demonstrativoFaturamento->documentoId = $documento->id;
                                        $demonstrativoFaturamento->usuarioCriacaoId = JWTAuth::user()->id;
                                        $demonstrativoFaturamento->usuarioAtualizacaoId = JWTAuth::user()->id;
                                        $demonstrativoFaturamento->save();
                                    }
                                }
    
                            }

                        }
                    }


                    return $this->response(201, "MSG000151", null);

                }else{
                    return $this->response(201, "MSG000071", null);
                }

            // });


        } catch (Exception $e) {
            return $this->response(404, "MSG000131");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function obter($id)
    {
        try {

            if (is_null($id)) {
                return $this->response(404, "MSG000152");
            }

            $documento = Documento::find($id);
            $documentoDto = [
                "id" => $documento->id,
                "nome" => $documento->nome,
                "nomeOriginal" => $documento->nomeOriginal,
                "tipo" => $documento->tipo,
                "caminho" => $documento->caminho,
                "extensao" => $documento->extensao,
                "sexo" => $documento->sexo,
                "status" => $documento->status,
                "dataCriacao" => $documento->created_at,
                "dataAtualizacao" => $documento->updated_at,
                "usuarioCriacaoId" => $documento->usuarioCriacaoId,
                "usuarioAtualizacaoId" => $documento->usuarioAtualizacaoId
            ];

            if (!is_null(($documento))) {

                return $this->response(200, "MSG000151", $documentoDto);

            } else {

                return $this->response(404, "MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(Request $request, $id)
    {
        try {

            if (is_null($id)) {
                return $this->response(404, "MSG000152");
            }

            $user = User::find($id);

            if (!is_null(($user))) {

                $user->nome = is_null($request->nome) ? $user->nome : $request->nome;
                $user->email = is_null($request->email) ? $user->email : $request->email;
                $user->password = is_null($request->password) ? $user->password : $request->password;
                $user->usuarioAtualizacao = 1;
                $user->save();

                return $this->response(200, "MSG000151", $user);

            } else {

                return $this->response(404, "MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deletar($id)
    {

        try {

            if (is_null($id)) {
                return $this->response(404, "MSG000152");
            }

            $user = User::find($id);

            if (!is_null(($user))) {

                $user->delete();
                return $this->response(200, "MSG000144");

            } else {

                return $this->response(404, "MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }
    }

    public function nome($id)
    {
        try {

            if (is_null($id)) {
                return $this->response(404, "MSG000152");
            }

            $documento = Documento::select('nomeOriginal')->where('id',$id)->first();

            if (!is_null(($documento))) {

                return $this->response(200, "MSG000144", $documento->nomeOriginal);

            } else {

                return $this->response(404, "MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }

    }

    public function status(Request $request, $id)
    {
        try {

            if (is_null($id)) {
                return $this->response(404, "MSG000152");
            }

            $user = User::find($id);

            if (!is_null(($user))) {

                $user->status = is_null($request->status) ? $user->status : $request->status;
                $user->save();

                return $this->response(200, "MSG000144", $user);

            } else {

                return $this->response(404, "MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }

    }

    public function grupo($id, Request $request)
    {
        $grupoId = $request->id;
        if (is_null($id) || $grupoId) {
            return $this->response(404, "MSG000152");
        }

        $user = User::find($id);
        $role = Role::find($request->id);

        if (!is_null(($user)) || !is_null(($role))) {

            //$user->attachRole($request->input('role'));
            $user->roles()->attach($role->id);
            $user->save();

            return $this->response(200, "MSG000144", $user);

        } else {

            return $this->response(404, "MSG000112");

        }

        return response()->json("created");
    }

}
