<?php

namespace App\Http\Controllers\Api\v1;

use App\Faturamento;
use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth as JWTAuth;

class FaturamentoController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function total()
    {
        $total = Faturamento::all()->count();
        return $this->response(200, "MSG000151", $total);
    }

    public function pesquisar(Request $request, $id=null)
    {
        $qtdRegistros = is_null($request->qtdRegistros) || $request->qtdRegistros == -1 ? 999999999999999 : $request->qtdRegistros;
        $pageCurrent = $request->get('pageCurrent');
        $orderBy = is_null($request->orderBy) ? 'id' : $request->orderBy;
        $orderType = is_null($request->orderType) ? 'desc' : $request->orderType;
        $documentoId = $id;

        $query = Faturamento::query();

        //descricao
        if (!is_null($request->get('descricao'))) {
            $query = $query->where('faturamentos.descricao', 'like', '%' . $request->get('nome') . '%');
        }

        //id
        if (!is_null($request->get('id'))) {
            $query = $query->where('faturamentos.id', '=', $request->get('id'));
        }

        //id
        if (!is_null($documentoId)) {
            $query = $query->where('faturamentos.documentoId', '=', $documentoId);
        }
        
        //status
        if (!is_null($request->get('status'))) {
            $query = $query->where('status', '=', $request->get('status'));
        }

        //extensao
        if (!is_null($request->get('extensao'))) {
            $query = $query->where('extensao', (boolean) json_decode(strtolower($request->get('extensao'))));
        }

        //valor
        $valorInicial = $request->get('valorInicial');
        $valorFinal = $request->get('valorFinal');

        if (!is_null(($valorInicial)) || !is_null(($valorFinal))) {

            if (!is_null(($valorInicial))) {
                $inicial = Carbon::parse($valorInicial);
                $query = $query->where('valor', ">=", $inicial);
            }

            if (!is_null(($valorFinal))) {

                $final = Carbon::parse($valorFinal)->endOfDay();
                $query = $query->where('valor', "<=", $final);
            }
        }

        //data
        $dataInicial = $request->get('dataInicial');
        $dataFinal = $request->get('dataFinal');

        if (!is_null(($dataInicial)) || !is_null(($dataFinal))) {

            if (!is_null(($dataInicial))) {
                $inicial = Carbon::parse($dataInicial);
                $query = $query->where('data', ">=", $inicial);
            }

            if (!is_null(($dataFinal))) {

                $final = Carbon::parse($dataFinal)->endOfDay();
                $query = $query->where('data', "<=", $final);
            }
        }

        //dataCriacao
        $dataCriacaoInicial = $request->get('dataCriacaoInicial');
        $dataCriacaoFinal = $request->get('dataCriacaoFinal');

        if (!is_null(($dataCriacaoInicial)) || !is_null(($dataCriacaoFinal))) {

            if (!is_null(($dataCriacaoInicial))) {
                $inicial = Carbon::parse($dataCriacaoInicial);
                $query = $query->where('dataCriacaoInicial', ">=", $inicial);
            }

            if (!is_null(($dataCriacaoFinal))) {

                $final = Carbon::parse($dataCriacaoFinal)->endOfDay();
                $query = $query->where('dataCriacaoInicial', "<=", $final);
            }
        }

        //dataCriacao
        $dataAtualizacaoInicial = $request->get('dataAtualizacaoInicial');
        $dataAtualizacaoFinal = $request->get('dataAtualizacaoFinal');

        if (!is_null(($dataAtualizacaoInicial)) || !is_null(($dataAtualizacaoFinal))) {

            if (!is_null(($dataAtualizacaoInicial))) {
                $inicial = Carbon::parse($dataAtualizacaoInicial);
                $query = $query->where('dataAtualizacaoFinal', ">=", $inicial);
            }

            if (!is_null(($dataAtualizacaoFinal))) {

                $final = Carbon::parse($dataAtualizacaoFinal)->endOfDay();
                $query = $query->where('dataAtualizacaoFinal', "<=", $final);
            }
        }

        $totalRecordsFilter = $query->get()->Count();

        $records = $query
            ->orderBy($orderBy, $orderType)
            ->select('faturamentos.*')
            ->skip($pageCurrent)
            ->take($qtdRegistros)
            ->get();

        $data_arr = array();
        foreach ($records as $record) {
            $id = $record->id;
            $descricao = $record->descricao;
            $codigo = $record->codigo;
            $valor = $record->valor;
            $data = $record->data;
            $documentoId = $record->documentoId;
            $status = $record->status;
            $dataCriacao = $record->dataCriacao;
            $dataAtualizacao = $record->dataAtualizacao;

            $data_arr[] = array(
                "descricao"=>$descricao,
                "id" => $id,
                "codigo" => $codigo,
                "valor" => $valor,
                "data" => $data,
                "documentoId" => $documentoId,
                "status" => $status,
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

            if ($request->hasFile('file')) {

                foreach ($request->file('file') as $file) {

                    if ($file->isValid()) {
                        $extensao = $file->getClientOriginalExtension();
                        $nome = time() . Str::random(5) . '.' . $file->getClientOriginalExtension();
                        $nomeOriginal = $file->getClientOriginalName();
                        $destination = 'faturamentoos';
                        $file->move($destination, $nome);

                        $faturamentoo = new Faturamento();
                        $faturamentoo->nome = $nome;
                        $faturamentoo->nomeOriginal = $nomeOriginal;
                        $faturamentoo->tipo = 1;
                        $faturamentoo->caminho = $destination;
                        $faturamentoo->extensao = $extensao;
                        $faturamentoo->status = 0;
                        $faturamentoo->usuarioCriacaoId = JWTAuth::user()->id;
                        $faturamentoo->usuarioAtualizacaoId = JWTAuth::user()->id;
                        $faturamentoo->save();
                    }
                }


                return $this->response(201, "MSG000151", null);

            }else{
                return $this->response(201, "MSG000071", null);
            }

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

            $user = User::find($id);
            $userDto = [
                "id" => $user->id,
                "nome" => $user->nome,
                "nomeOriginal" => $user->nomeOriginal,
                "tipo" => $user->tipo,
                "caminho" => $user->caminho,
                "extensao" => $user->extensao,
                "sexo" => $user->sexo,
                "status" => $user->status,
                "dataCriacao" => $user->created_at,
                "dataAtualizacao" => $user->updated_at,
                "usuarioCriacaoId" => $user->usuarioCriacaoId,
                "usuarioAtualizacaoId" => $user->usuarioAtualizacaoId
            ];

            if (!is_null(($user))) {

                return $this->response(200, "MSG000151", $userDto);

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

            $user = User::find($id);

            if (!is_null(($user))) {

                return $this->response(200, "MSG000144", $user->nome);

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
