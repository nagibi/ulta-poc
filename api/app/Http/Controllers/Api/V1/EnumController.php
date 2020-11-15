<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class EnumController extends Controller
{
    public function simNao()
    {

        $result = [
            ['valor' => 0, 'descricao' => 'Sim'],
            ['valor' => 1, 'descricao' => 'Não'],
        ];

        return $this->response(200, "MSG000151", $result);
    }

    public function statusDocumento()
    {

        $result = [
            ['valor' => 0, 'descricao' => 'Aguardando processamento'],
            ['valor' => 1, 'descricao' => 'Em processamento'],
            ['valor' => 2, 'descricao' => 'Processado'],
            ['valor' => 3, 'descricao' => 'Erro ao processar'],
        ];

        return $this->response(200, "MSG000151", $result);
    }

    public function tipoArquivo()
    {
        $result = [
            ['valor' => 0, 'descricao' => 'Sim'],
            ['valor' => 1, 'descricao' => 'Não'],
        ];
        return $this->response(200, "MSG000151", $result);
    }

    public function tipoDocumento()
    {
        $result = [
            ['valor' => 0, 'descricao' => 'Faturamento'],
            ['valor' => 1, 'descricao' => 'Demonstrativo de pagamento'],
        ];
        return $this->response(200, "MSG000151", $result);
    }

    public function sexo()
    {
        $result = [
            ['valor' => 0, 'descricao' => 'Feminino'],
            ['valor' => 1, 'descricao' => 'Masculino'],
            ['valor' => 2, 'descricao' => 'Outros'],
        ];
        return $this->response(200, "MSG000151", $result);
    }

    public function status()
    {
        $result = [
            ['valor' => 0, 'descricao' => 'Inativo'],
            ['valor' => 1, 'descricao' => 'Ativo'],
        ];
        return $this->response(200, "MSG000151", $result);
    }
}
