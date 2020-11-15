<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CriarTabelaDemonstrativoFaturamentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demonstrativo_faturamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('documentoId')->unsigned();
            $table->integer('faturamentoId')->unsigned()->nullable(true)->default(null);
            $table->decimal('valor',8,2)->nullable(false);
            $table->string('descricao',200)->nullable(true);
            $table->integer('codigo')->nullable(false);
            $table->dateTime('data')->nullable(false);
            $table->integer('status')->nullable(false)->default(1);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);

            $table->foreign('documentoId')->references('id')->on('documentos')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('usuarioCriacaoId')->references('id')->on('usuarios');
            $table->foreign('usuarioAtualizacaoId')->references('id')->on('usuarios');        
            $table->foreign('faturamentoId')->references('id')->on('faturamentos');        
        });

        Schema::table('faturamentos', function (Blueprint $table) {
            $table->foreign('demonstrativoFaturamentoId')->references('id')->on('demonstrativo_faturamentos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demonstrativos_pagamentos');
    }
}
