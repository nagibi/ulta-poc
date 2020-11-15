<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CriarTabelaFaturamentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faturamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('documentoId')->unsigned();
            $table->integer('codigo')->nullable(false);
            $table->decimal('valor',8,2)->nullable(false);
            $table->string('descricao',200)->nullable(true);
            $table->dateTime('data')->nullable(false);
            $table->integer('status')->nullable(false)->default(0);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);
            $table->integer('demonstrativoFaturamentoId')->unsigned()->nullable(true)->default(null);

            $table->foreign('documentoId')->references('id')->on('documentos')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('usuarioCriacaoId')->references('id')->on('usuarios');
            $table->foreign('usuarioAtualizacaoId')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faturamentos');
    }
}
