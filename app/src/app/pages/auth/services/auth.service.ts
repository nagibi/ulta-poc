import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import { UsuarioCadastrar } from '../models/usuario-cadastrar.model';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { Usuario, UsuarioAutenticado } from '../models/usuario.model';
import { BaseApiService } from '../../../core/services/base.api.service';
import * as moment from "moment";

const USUARIO_AUTORIZADO: string = 'usuarioAutorizado';
// const USUARIO_EXPIRACAO: string = 'usuarioExpiracao';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {

  public static API_CONTA: string = 'api/v1/auth';

  private usuarioLogadoSubject: BehaviorSubject<UsuarioAutenticado>;
  public usuarioLogado: Observable<UsuarioAutenticado>;

  constructor(protected http: HttpClient) {

    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');

    this.usuarioLogadoSubject = new BehaviorSubject<UsuarioAutenticado>(
      JSON.parse(localStorage.getItem(USUARIO_AUTORIZADO))
    );
    this.usuarioLogado = this.usuarioLogadoSubject.asObservable();
  }

  public get usuarioLogadoValue(): UsuarioAutenticado {
    return this.usuarioLogadoSubject.value;
  }

  isAutorizado() {
    return !!this.usuarioLogadoValue;
  }

  // isLoggedIn(){
  //   return moment().isBefore(this.getExpiration());
  // }

//   getExpiration() {
//     const expiration = localStorage.getItem(USUARIO_EXPIRACAO);
//     const expiresAt = JSON.parse(expiration);
//     return moment(expiresAt);
// }

  obterPermissoes(): Observable<RetornoPadrao<any>> {
    return this.http
      .get<RetornoPadrao<any>>(`${environment.apiUrl}/${AuthService.API_CONTA}/permissoes`)
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  recuperarSenha(email: string): Observable<RetornoPadrao<any>> {

    return this.http
      .post<RetornoPadrao<any>>(
        `${environment.apiUrl}/${AuthService.API_CONTA}/resetar-senha`,
        {email},
        { headers: this.httpHeaders}
        )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  confirmarCadastro(token: string): Observable<RetornoPadrao<any>> {
    return this.http
      .get<RetornoPadrao<any>>(
        `${environment.apiUrl}/${AuthService.API_CONTA}/confirmar-email/${token}`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  setUsuarioLogado(value:UsuarioAutenticado){

    if(value.arquivoId==null || value.arquivoId==0){
      value.arquivoCaminho = 'assets/media/svg/avatars/009-boy-4.svg';
    }

    localStorage.setItem(USUARIO_AUTORIZADO, JSON.stringify(value));
    this.usuarioLogadoSubject.next(value);
  }

  login(
    email: string,
    password: string
  ): Observable<RetornoPadrao<UsuarioAutenticado>> {
    return this.http
    .post<RetornoPadrao<UsuarioAutenticado>>(
      `${environment.apiUrl}/${AuthService.API_CONTA}/login`,
      {
        email,
        password,
      }
    )
    .pipe(

      map(res => {
        debugger
        this.setUsuarioLogado(res.result);
        return res;
      })
    );
  }

  registrar(
    usuario: Usuario
  ): Observable<RetornoPadrao<Usuario>> {
    return this.http
      .post<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${AuthService.API_CONTA}/cadastrar`,
        usuario,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem(USUARIO_AUTORIZADO);
    this.usuarioLogadoSubject.next(null);
  }

  verificarPermissaoParaView(view) {
    if (!view.requerAutenticacao) {
      return true;
    }
  }

  usuarioTemPermissaoParaView(view) {
    if (!this.usuarioLogadoValue) {
      return false;
    }
    if (!view.permissoes || !view.permissoes.length) {
      return true;
    }
    return this.usuarioTemPermissao(view.permissoes);
  }

  usuarioTemPermissao(permissoes:string[]) {
    if (!this.usuarioLogadoValue) {
      return false;
    }

    var possui = false;

    permissoes.forEach((permissao) => {
      if (this.usuarioLogadoValue.funcionalidades.indexOf(permissao) >= 0) {
        possui = true;
        return;
      }
    });
    return possui;
  }

}
