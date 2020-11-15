<?php

use App\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CriarPermissoesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        /********************
         * Usuários
        ********************/
        
        $usuarios = [
            [
                'name' => 'usuario-cadastrar',
                'display_name' => 'usuario-cadastrar',
                'description' => 'Adicionar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'usuario-atualizar',
                'display_name' => 'usuario-atualizar',
                'description' => 'Atualizar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'usuario-status',
                'display_name' => 'usuario-status',
                'description' => 'Ativar/Inativar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'usuario-obter',
                'display_name' => 'usuario-obter',
                'description' => 'Visualizar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'usuario-deletar',
                'display_name' => 'usuario-deletar',
                'description' => 'Deletar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'usuario-pesquisar',
                'display_name' => 'usuario-pesquisar',
                'description' => 'Pesquisar usuário',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ]
        ];

        /********************
         * Documentos
        ********************/

        $documentos = [
            [
                'name' => 'documento-cadastrar',
                'display_name' => 'documento-cadastrar',
                'description' => 'Adicionar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'documento-atualizar',
                'display_name' => 'documento-atualizar',
                'description' => 'Atualizar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'documento-status',
                'display_name' => 'documento-status',
                'description' => 'Ativar/Inativar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'documento-obter',
                'display_name' => 'documento-obter',
                'description' => 'Visualizar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'documento-deletar',
                'display_name' => 'documento-deletar',
                'description' => 'Deletar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'documento-pesquisar',
                'display_name' => 'documento-pesquisar',
                'description' => 'Pesquisar documento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ]
        ];

        /********************
         * Faturamentos
        ********************/

        $faturamentos = [

            [
                'name' => 'faturamento-cadastrar',
                'display_name' => 'documento-faturamento',
                'description' => 'Adicionar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'faturamento-atualizar',
                'display_name' => 'faturamento-atualizar',
                'description' => 'Atualizar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'faturamento-status',
                'display_name' => 'faturamento-status',
                'description' => 'Ativar/Inativar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'faturamento-obter',
                'display_name' => 'faturamento-obter',
                'description' => 'Visualizar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'faturamento-deletar',
                'display_name' => 'faturamento-deletar',
                'description' => 'Deletar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'faturamento-pesquisar',
                'display_name' => 'faturamento-pesquisar',
                'description' => 'Pesquisar faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ]
        ];

        /**************************************
         * Demonstrativos Faturamentos
        **************************************/

        $demnonstrativosFaturamentos = [

            [
                'name' => 'demonstrativo-faturamento-cadastrar',
                'display_name' => 'documento-demonstrativo-faturamento',
                'description' => 'Adicionar demonstrativo de faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'demonstrativo-faturamento-atualizar',
                'display_name' => 'demonstrativo-faturamento-atualizar',
                'description' => 'Atualizar demonstrativo faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'demonstrativo-faturamento-status',
                'display_name' => 'demonstrativo-faturamento-status',
                'description' => 'Ativar/Inativar demonstrativo faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'demonstrativo-faturamento-obter',
                'display_name' => 'demonstrativo-faturamento-obter',
                'description' => 'Visualizar demonstrativo faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'demonstrativo-faturamento-deletar',
                'display_name' => 'demonstrativo-faturamento-deletar',
                'description' => 'Deletar demonstrativo faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
            [
                'name' => 'demonstrativo-faturamento-pesquisar',
                'display_name' => 'demonstrativo-faturamento-pesquisar',
                'description' => 'Pesquisar demonstrativo faturamento',
                'usuarioCriacaoId' => 1,
                'usuarioAtualizacaoId' => 1,
                'dataCriacao'=>date('Y-m-d H:i:s'),
                'dataAtualizacao'=>date('Y-m-d H:i:s'),

            ],
        ];

        $admin = [
            //usuario
            [
                'role_id' => 1,
                'permission_id' => 1,
            ],
            [
                'role_id' => 1,
                'permission_id' => 2,
            ],
            [
                'role_id' => 1,
                'permission_id' => 3,
            ],
            [
                'role_id' => 1,
                'permission_id' => 4,
            ],
            [
                'role_id' => 1,
                'permission_id' => 5,
            ],
            [
                'role_id' => 1,
                'permission_id' => 6,
            ],
            //documento
            [
                'role_id' => 1,
                'permission_id' => 7,
            ],
            [
                'role_id' => 1,
                'permission_id' => 8,
            ],
            [
                'role_id' => 1,
                'permission_id' => 9,
            ],
            [
                'role_id' => 1,
                'permission_id' => 10,
            ],
            [
                'role_id' => 1,
                'permission_id' =>11,
            ],
            [
                'role_id' => 1,
                'permission_id' => 12,
            ],
            //faturamento
            [
                'role_id' => 1,
                'permission_id' => 13,
            ],
            [
                'role_id' => 1,
                'permission_id' => 14,
            ],
            [
                'role_id' => 1,
                'permission_id' => 15,
            ],
            [
                'role_id' => 1,
                'permission_id' => 16,
            ],
            [
                'role_id' => 1,
                'permission_id' =>17,
            ],
            [
                'role_id' => 1,
                'permission_id' => 18,
            ],
            //demonstrativo-faturamento
            [
                'role_id' => 1,
                'permission_id' => 19,
            ],
            [
                'role_id' => 1,
                'permission_id' => 20,
            ],
            [
                'role_id' => 1,
                'permission_id' => 21,
            ],
            [
                'role_id' => 1,
                'permission_id' => 22,
            ],
            [
                'role_id' => 1,
                'permission_id' =>23,
            ],
            [
                'role_id' => 1,
                'permission_id' => 24,
            ],
        ];

        $edit = [
            //documento
            [
                'role_id' => 2,
                'permission_id' => 7,
            ],
            [
                'role_id' => 2,
                'permission_id' => 8,
            ],
            [
                'role_id' => 2,
                'permission_id' => 9,
            ],
            [
                'role_id' => 2,
                'permission_id' => 10,
            ],
            [
                'role_id' => 2,
                'permission_id' =>11,
            ],
            [
                'role_id' => 2,
                'permission_id' => 12,
            ],
            //faturamento
            [
                'role_id' => 2,
                'permission_id' => 13,
            ],
            [
                'role_id' => 2,
                'permission_id' => 14,
            ],
            [
                'role_id' => 2,
                'permission_id' => 15,
            ],
            [
                'role_id' => 2,
                'permission_id' => 16,
            ],
            [
                'role_id' => 2,
                'permission_id' =>17,
            ],
            [
                'role_id' => 2,
                'permission_id' => 18,
            ],
            //demonstrativo-faturamento
            [
                'role_id' => 2,
                'permission_id' => 19,
            ],
            [
                'role_id' => 2,
                'permission_id' => 20,
            ],
            [
                'role_id' => 2,
                'permission_id' => 21,
            ],
            [
                'role_id' => 2,
                'permission_id' => 22,
            ],
            [
                'role_id' => 2,
                'permission_id' =>23,
            ],
            [
                'role_id' => 2,
                'permission_id' => 24,
            ],
        ];

        Permission::insert(array_merge($usuarios,$documentos,$faturamentos,$demnonstrativosFaturamentos));
        DB::table('permission_role')->insert(array_merge($admin,$edit));

    }
}
