import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { AuthComponent } from '../auth.component';
import { MessageService } from 'src/app/core/services/message.service';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    
    const usuarioAtual = this.auth.usuarioLogadoValue;
    if (usuarioAtual) {
      // console.log(route.data.roles);
      var permissoes = route.data.permissoes;
      if (permissoes) {
        
        if (
          usuarioAtual.funcionalidades.filter(
            (funcionalidade) => permissoes.indexOf(funcionalidade) >= 0
          ).length <= 0
        ) {
          this.messageService.create('MSG000079')
          // this.snackBar.open('Você não possui permissão', 'Fechar', {
          //   duration: 5000,
          //   horizontalPosition: 'right',
          //   verticalPosition: 'bottom',
          // });
          this.router.navigate([LoginComponent.ROTA]);
          return false;
        }
      }
      return true;
    }

    this.router.navigate([AuthComponent.ROTA], {
      queryParams: { redirect: state.url },
      replaceUrl: true,
    });
    return false;
  }
}
