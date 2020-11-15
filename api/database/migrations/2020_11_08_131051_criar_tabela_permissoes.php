<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaPermissoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',200)->unique();
            $table->string('display_name',200)->nullable();
            $table->string('description',200)->nullable();
            $table->integer('status')->nullable(false)->default(0);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);

            $table->foreign('usuarioCriacaoId')->references('id')->on('usuarios');
            $table->foreign('usuarioAtualizacaoId')->references('id')->on('usuarios');
        });

        // (Many-to-Many)
        Schema::create('role_usuario', function (Blueprint $table) {
            $table->integer('usuario_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('usuario_id')->references('id')->on('usuarios')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['usuario_id', 'role_id']);
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',200)->unique();
            $table->string('display_name',200)->nullable();
            $table->string('description',200)->nullable();
            $table->integer('status')->nullable(false)->default(1);
            $table->integer('usuarioCriacaoId')->unsigned();
            $table->integer('usuarioAtualizacaoId')->unsigned();
            $table->dateTime('dataCriacao')->nullable(false);
            $table->dateTime('dataAtualizacao')->nullable(false);

            $table->foreign('usuarioCriacaoId')->references('id')->on('usuarios');
            $table->foreign('usuarioAtualizacaoId')->references('id')->on('usuarios');
        });

        Schema::create('permission_role', function (Blueprint $table) {
            $table->integer('permission_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['permission_id', 'role_id']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_usuario');
        Schema::drop('roles');
    }
}
