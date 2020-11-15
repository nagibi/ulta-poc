<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Role;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Validator;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function total(){
        $total = Role::all()->count();
        return $this->response(200,"MSG000151",$total);
    }

    public function pesquisar(Request $request)
    {
        $qtdRegistros = is_null($request->qtdRegistros) || $request->qtdRegistros == -1 ? 999999999999999 : $request->qtdRegistros;
        $pageCurrent = $request->get('pageCurrent');
        $orderBy = is_null($request->orderBy) ? 'id' : $request->orderBy;
        $orderType = is_null($request->orderType) ? 'desc' : $request->orderType;

        $query = Role::query();

        //name
        if (!is_null($request->get('name'))) {
            $query = $query->where('roles.name', 'like', '%' . $request->get('name') . '%');
        }

        //display_name
        if (!is_null($request->get('display_name'))) {
            $query = $query->where('roles.display_name', 'like', '%' . $request->get('display_name') . '%');
        }

        //description
        if (!is_null($request->get('description'))) {
            $query = $query->where('roles.description', 'like', '%' . $request->get('description') . '%');
        }

        //status
        // if (!is_null($request->get('status'))) {
        //     $query = $query->where('status', '=',$request->get('status'));
        // }

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
            ->select('roles.*')
            ->skip($pageCurrent)
            ->take($qtdRegistros)
            ->get();

        $data_arr = array();
        foreach ($records as $record) {
            $id = $record->id;
            $name = $record->name;
            $display_name = $record->display_name;
            $description = $record->description;
            // $status = $record->status;
            $created_at = $record->created_at;
            $updated_at = $record->updated_at;

            $data_arr[] = array(
                "id" => $id,
                "nome" => $name,
                "display_name" => $display_name,
                "description" => $description,
                // "status" => $status,
                "created_at" => $created_at,
                "updated_at" => $updated_at,
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

            $credenciais = $request->only('nome', 'password','email');

            $validator = Validator::make($credenciais, [
                'name' => 'required|max:255|unique:roles',
                'display_name' => 'required',
            ]);

            if($validator->fails()) {
                return $this->response(404, "Formulário inválido",$validator->errors()->all());
            }

            $role = new Role;
            $role->name = $request->input('name');
            $role->display_name = $request->input('display_name');
            $role->description = $request->input('description');
            $role->save();

            return $this->response(201,"MSG000151",$role);

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

            if(is_null($id)){
                return $this->response(404, "MSG000152");
            }

            $user = Role::find($id);

            if (!is_null(($user))) {

                return $this->response(200,"MSG000151", $user);

            }else{

                return $this->response(404,"MSG000112");

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

            if(is_null($id)){
                return $this->response(404, "MSG000152");
            }

            $user = Role::find($id);

            if (!is_null(($user))) {

                $user->nome = is_null($request->nome) ? $user->nome : $request->nome;
                $user->email = is_null($request->email) ? $user->email : $request->email;
                $user->password = is_null($request->password) ? $user->password : $request->password;
                $user->usuarioAtualizacao = 1;
                $user->save();

                return $this->response(200,"MSG000151", $user);

            }else{

                return $this->response(404,"MSG000112");

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

            if(is_null($id)){
                return $this->response(404, "MSG000152");
            }

            $user = Role::find($id);

            if (!is_null(($user))) {

                $user->delete();
                return $this->response(200,"MSG000144");

            }else{

                return $this->response(404,"MSG000112");

            }

        } catch (Exception $ex) {
            return $this->response(404, "MSG000131");
        }
    }
}
