<?php

use App\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CriarGruposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $grupos = 
        [
            [
                'name' => 'admin',
                'display_name' => 'administrador',
                'description' => 'super usuários',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'edit',
                'display_name' => 'editor',
                'description' => 'usuários básicos dos sistema',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
        ];

        $usuarioGrupo = 
        [
            [
                'usuario_id' => 1,
                'role_id'=>1
            ],
            [
                'usuario_id' => 2,
                'role_id'=>2
            ]
        ];

        Role::insert($grupos);
        DB::table('role_usuario')->insert($usuarioGrupo);
    }
}
