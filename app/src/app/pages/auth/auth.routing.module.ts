import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AuthModule } from './auth.module';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path:'',
        redirectTo: 'login',
        pathMatch:'full'
      },
      {
        path: 'login',
        canActivate: [],
        component: LoginComponent,
        data: {
          title: 'Login',
        },
      },
      {
        path: 'recuperar-senha',
        canActivate: [],
        component: RecuperarSenhaComponent,
        data: {
          title: 'Recuperar Senha',
        },
      },
      {
        path: 'registrar',
        canActivate: [],
        component: RegistrarComponent,
        data: {
          title: 'Registrar',
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    AuthModule, 
    RouterModule.forChild(ROUTES)],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule {}
