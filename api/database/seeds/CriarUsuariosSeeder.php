
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Usuario;

class CriarUsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // User::query()->truncate();
        // php artisan make:seeder UsersTableSeeder
        // php artisan db:seed --class=UsersTableSeeder

        Usuario::create([ 
            'email' => 'nagibi@gmail.com',
            'password' => Hash::make('123456'),
            'nome' => 'Nagibi',
            'confirmacaoEmail' => 1,
            'usuarioCriacaoId'=>1,
            'usuarioAtualizacaoId'=>1,
            'dataCriacao'=>date('Y-m-d H:i:s'),
            'dataAtualizacao'=>date('Y-m-d H:i:s'),
        ]);

        Usuario::create([ 
            'email' => 'ibigan@gmail.com',
            'password' => Hash::make('123456'),
            'nome' => 'Emanuel',
            'confirmacaoEmail' => 1,
            'usuarioCriacaoId'=>1,
            'usuarioAtualizacaoId'=>1,
            'dataCriacao'=>date('Y-m-d H:i:s'),
            'dataAtualizacao'=>date('Y-m-d H:i:s'),
        ]);
    }
}
