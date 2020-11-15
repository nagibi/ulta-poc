<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CriarUsuariosSeeder::class);
        $this->call(CriarGruposSeeder::class);
        $this->call(CriarPermissoesSeeder::class);
    }
}
