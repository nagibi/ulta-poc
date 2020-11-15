<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CriarTabelaDocumentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome',200)->nullable(false);
            $table->string('nomeOriginal',200)->nullable(false);
            $table->integer('tipo')->nullable(false);
            $table->string('caminho',200)->nullable(false);
            $table->string('extensao',200);
            $table->integer('status')->nullable(false)->default(0);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);

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
        Schema::dropIfExists('documentos');

    }
}
