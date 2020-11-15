import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PerfilComponent } from './perfil.component';
import { PerfilModule } from './perfil.module';
import { EnderecoPesquisarComponent } from './components/endereco/endereco-pesquisar/endereco-pesquisar.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { InformacaoPessoalComponent } from './components/informacao-pessoal/informacao-pessoal.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { TelefonePesquisarComponent } from './components/telefone/telefone-pesquisar/telefone-pesquisar.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacao-pessoal',
        pathMatch: 'full',
      },
      {
        path: 'informacao-pessoal',
        canActivate: [],
        component: InformacaoPessoalComponent,
        data: {
          title: 'Informações pessoais',
        },
      },
      {
        path: 'alterar-senha',
        canActivate: [],
        component: AlterarSenhaComponent,
        data: {
          title: 'Alterar senha',
        },
      },
      {
        path: 'telefone',
        canActivate: [],
        component: TelefonePesquisarComponent,
        data: {
          title: 'Telefones',
        },
      },
      {
        path: 'telefone/novo',
        component: TelefoneFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo endereço',
          permissoes: ['usuario.adicionar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'telefone/:id',
        component: TelefoneFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar endereço',
          permissoes: ['usuario.atualizar', 'usuario-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'endereco',
        canActivate: [],
        component: EnderecoPesquisarComponent,
        data: {
          title: 'Endereços',
        },
      },
      {
        path: 'endereco/novo',
        component: EnderecoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo endereço',
          permissoes: ['usuario.adicionar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'endereco/:id',
        component: EnderecoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar endereço',
          permissoes: ['usuario.atualizar', 'usuario-obter'],
          returnUrl: window.location.pathname,
        },
      },

      // {
      //   path: 'configuracoes',
      //   canActivate: [],
      //   component: PerfilConfiguracaoComponent,
      //   data: {
      //     title: 'Configurações',
      //   },
      // }
    ],
  },
];

@NgModule({
  imports: [PerfilModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
