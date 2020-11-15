import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Grupo } from '../../admin/models/grupo.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';
import { Endereco } from '../../perfil/models/endereco.model';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService  extends BaseApiService {

  public static API_USUARIOS: string = 'api/v1/usuarios';
  public static API_ENDERECOS : string = 'enderecos';
  public static API_GRUPOS : string = 'grupos';

  constructor(protected http: HttpClient) {

    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarUsuario(
    usuario: Usuario
  ): Observable<RetornoPadrao<Usuario>> {
    if(usuario.id > 0){
      return this.atualizarUsuario(usuario);
    }else{
      return this.adicionarUsuario(usuario);
    }
  }


  adicionarUsuario(
    usuario: Usuario
  ): Observable<RetornoPadrao<Usuario>> {
    return this.http
      .post<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}`,
        usuario,
        { headers: this.httpHeaders }
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  deletarUsuario(id: number): Observable<RetornoPadrao<any>> {
    const options = {
      headers: this.httpHeaders,
      body: id,
    };
    return this.http
      .delete<RetornoPadrao<any>>(`${environment.apiUrl}/${UsuarioService.API_USUARIOS}`,options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  obterUsuarios(): Observable<RetornoPadrao<GridRespModel<Usuario>>> {
    return this.http
      .get<RetornoPadrao<GridRespModel<Usuario>>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  obterUsuarioId(id: number): Observable<RetornoPadrao<Usuario>> {
    return this.http
      .get<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${id}`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  obterUsuarioNome(id: number): Observable<RetornoPadrao<string>> {
    return this.http
      .get<RetornoPadrao<string>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${id}/nome`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  statusUsuario(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Usuario>> {
    return this.http
      .put<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${id}/status`,
        {status},
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  atualizarUsuario(
    usuario: Usuario
  ): Observable<RetornoPadrao<Usuario>> {
    return this.http
      .put<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuario.id}`,
        usuario,
        { headers: this.httpHeaders }
      )
      .pipe(
        retry(1),
        map((res: any) => {
          return res;
        })
      );
  }

  obterTotalUsuarios(): Observable<RetornoPadrao<number>> {

    return this.http
      .get<RetornoPadrao<number>>(`${environment.apiUrl}/${UsuarioService.API_USUARIOS}/total`)
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  adicionarGrupo(
    id: number,
    grupo: Grupo
  ): Observable<RetornoPadrao<Grupo>> {
    return this.http
      .patch<RetornoPadrao<Usuario>>(
        `${environment.apiUrl}/${id}/${UsuarioService.API_GRUPOS}`,
        grupo,
        { headers: this.httpHeaders }
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  deletarGrupo(
    id: number,
    grupoId: Grupo
  ): Observable<RetornoPadrao<any>> {
    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${id}/${UsuarioService.API_GRUPOS}/${grupoId}`,
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  obterGrupos(id: number): Observable<RetornoPadrao<Grupo[]>> {
    return this.http
      .get<RetornoPadrao<Grupo[]>>(
        `${environment.apiUrl}/${id}/${UsuarioService.API_USUARIOS}/${UsuarioService.API_GRUPOS}`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  // adicionarEndereco(
  //   endereco: EnderecoCadastrar
  // ): Observable<RetornoPadrao<EnderecoCadastrar[]>> {
  //   return this.http
  //     .patch<RetornoPadrao<EnderecoCadastrar[]>>(
  //       `${environment.apiUrl}/${endereco.usuarioId}/${UsuarioService.API_ENDERECOS}`,
  //       endereco,
  //       { headers: this.httpHeaders }
  //     )
  //     .pipe(

  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  // atualizarEndereco(
  //   endereco: EnderecoCadastrar
  // ): Observable<RetornoPadrao<EnderecoCadastrar[]>> {
  //   return this.http
  //     .patch<RetornoPadrao<EnderecoCadastrar[]>>(
  //       `${environment.apiUrl}/${endereco.usuarioId}/${UsuarioService.API_ENDERECOS}`,
  //       endereco,
  //       { headers: this.httpHeaders }
  //     )
  //     .pipe(

  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  // deletarEndereco(
  //   endereco:Endereco
  // ): Observable<RetornoPadrao<EnderecoCadastrar[]>> {
  //   return this.http
  //     .delete<RetornoPadrao<EnderecoCadastrar[]>>(
  //       `${environment.apiUrl}/${endereco.usuarioId}/${UsuarioService.API_ENDERECOS}/${endereco.id}`,
  //     )
  //     .pipe(

  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  // obterEnderecos(usuarioId:number): Observable<RetornoPadrao<EnderecoCadastrar[]>> {
  //   return this.http
  //     .get<RetornoPadrao<EnderecoCadastrar[]>>(
  //       `${environment.apiUrl}/${usuarioId}/${UsuarioService.API_ENDERECOS}`,
  //     )
  //     .pipe(

  //       map(res => {
  //         return res;
  //       })
  //     );
  // }
}
