import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminModule } from './admin.module';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TemplateEmailPesquisarComponent } from './components/template-email/template-email-pesquisar/template-email-pesquisar.component';
import { TemplateEmailFormComponent } from './components/template-email/template-email-form/template-email-form.component';
import { UsuarioPesquisarComponent } from './components/usuario/usuario-pesquisar/usuario-pesquisar.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { GrupoFormComponent } from './components/grupo/grupo-form/grupo-form.component';
import { GrupoPesquisarComponent } from './components/grupo/grupo-pesquisar/grupo-pesquisar.component';
import { DocumentoFormComponent } from './components/documento/documento-form/documento-form.component';
import { DocumentoPesquisarComponent } from './components/documento/documento-pesquisar/documento-pesquisar.component';
import { ArquivoFormComponent } from './components/arquivo/arquivo-form/arquivo-form.component';
import { ArquivoPesquisarComponent } from './components/arquivo/arquivo-pesquisar/arquivo-pesquisar.component';
import { BairroPesquisarComponent } from './components/bairro/bairro-pesquisar/bairro-pesquisar.component';
import { BairroFormComponent } from './components/bairro/bairro-form/bairro-form.component';
import { FuncionalidadeFormComponent } from './components/funcionalidade/funcionalidade-form/funcionalidade-form.component';
import { FuncionalidadePesquisarComponent } from './components/funcionalidade/funcionalidade-pesquisar/funcionalidade-pesquisar.component';
import { FaturamentoPesquisarComponent } from './components/faturamento/faturamento-pesquisar/faturamento-pesquisar.component';
import { FaturamentoFormComponent } from './components/faturamento/faturamento-form/faturamento-form.component';
import { DemonstrativoFaturamentoPesquisarComponent } from './components/demonstrativo-faturamento/demonstrativo-faturamento-pesquisar.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'template-email',
        component: TemplateEmailPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Temaple E-mails',
          permissoes: ['templateEmail-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'template-email/novo',
        component: TemplateEmailFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo temapler e-mail',
          permissoes: ['templateEmail-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'template-email/:id',
        component: TemplateEmailFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar temaple e-mail',
          permissoes: ['templateEmail-atualizar', 'templateEmail-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'usuario',
        component: UsuarioPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Usuários',
          permissoes: ['usuario-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'usuario/novo',
        component: UsuarioFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo usuário',
          permissoes: ['usuario-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'usuario/:id',
        component: UsuarioFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar usuário',
          permissoes: ['usuario-atualizar', 'usuario-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'documento',
        component: DocumentoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Documentos',
          permissoes: ['documento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'documento/novo',
        component: DocumentoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo Documento',
          permissoes: ['documento-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'documento/:id',
        component: DocumentoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Documenento usuário',
          permissoes: ['documento-atualizar', 'documento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'documento/:id/faturamento',
        component: FaturamentoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Faturamentos',
          permissoes: ['faturamento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'documento/:id/demonstrativo-faturamento',
        component: DemonstrativoFaturamentoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Demonstrativo de Faturamentos',
          permissoes: ['demonstrativo-faturamento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'faturamento',
        component: FaturamentoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Faturamentos',
          permissoes: ['faturamento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'faturamento/novo',
        component: FaturamentoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo Documento',
          permissoes: ['faturamento-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'faturamento/:id',
        component: FaturamentoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Documenento usuário',
          permissoes: ['faturamento-atualizar', 'faturamento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'demonstrativo-faturamento',
        component: DemonstrativoFaturamentoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Demonstrativos de Faturamento',
          permissoes: ['demonstrativo-faturamento-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'grupo',
        component: GrupoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Grupos',
          permissoes: ['grupo-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'grupo/novo',
        component: GrupoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo grupo',
          permissoes: ['grupo-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'grupo/:id',
        component: GrupoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar grupo',
          permissoes: ['grupo-atualizar', 'grupo-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'funcionalidade',
        component: FuncionalidadePesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Funcionalidades',
          permissoes: ['funcionalidade-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'funcionalidade/novo',
        component: FuncionalidadeFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Nova funcionalidade',
          permissoes: ['funcionalidade-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'funcionalidade/:id',
        component: FuncionalidadeFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar funcionalidade',
          permissoes: ['funcionalidade-atualizar', 'funcionalidade-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'bairro',
        component: BairroPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Bairros',
          permissoes: ['bairro-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'bairro/novo',
        component: BairroFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Novo bairro',
          permissoes: ['bairro-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'bairro/:id',
        component: BairroFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar bairro',
          permissoes: ['bairro-atualizar', 'bairro-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'arquivo',
        component: ArquivoPesquisarComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Arquivos',
          permissoes: ['arquivo-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'arquivo/novo',
        component: ArquivoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Nova arquivo',
          permissoes: ['arquivo-cadastrar'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'arquivo/:id',
        component: ArquivoFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Atualizar arquivo',
          permissoes: ['arquivo-atualizar', 'arquivo-obter'],
          returnUrl: window.location.pathname,
        },
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../perfil/perfil.routing.module').then(
            (m) => m.PerfilRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [AdminModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
