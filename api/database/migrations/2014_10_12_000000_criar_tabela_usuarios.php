<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CriarTabelaUsuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome',200)->nullable(false);
            $table->string('password');
            $table->string('email',191)->unique();
            $table->boolean('confirmacaoEmail')->defalt(false);
            $table->string('token',200)->nullable();
            $table->dateTime('dataNascimento')->nullable();
            $table->integer('sexo')->nullable(false)->default(1);
            $table->integer('status')->nullable(false)->default(0);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);

        });


        Schema::table('usuarios', function (Blueprint $table) {
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
        Schema::dropIfExists('usuarios');
    }
}
