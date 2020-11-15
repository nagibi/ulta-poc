import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, map, catchError } from 'rxjs/operators';
import { BaseApiService } from 'src/app/core/services/base.api.service';
import { Perfil } from '../models/perfil.model';
import { AlterarSenha } from '../models/alterar-senha.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilService extends BaseApiService {
  
  public static API_PERFIL: string = 'api/v1/perfil';
  public static API_PERFIL_ALTERAR_SENHA: string = 'api/v1/perfil/alterar-senha';

  constructor(protected http: HttpClient) {
    
    super(http);
  }

  obterPerfil(): Observable<RetornoPadrao<Perfil>> {
    return this.http
      .get<RetornoPadrao<Perfil>>(
        `${environment.apiUrl}/${PerfilService.API_PERFIL}`
      )
      .pipe(
        
        map(res => {
          return res;
        })
      );
  }
  
  atualizarPerfil(
    perfil: Perfil
  ): Observable<RetornoPadrao<Perfil>> {
    return this.http
      .put<RetornoPadrao<Perfil>>(
        `${environment.apiUrl}/${PerfilService.API_PERFIL}`,
        perfil,
        { headers: this.httpHeaders }
      )
      .pipe(
        retry(1),
        map(res => {
          return res;
        })
      );
  }

  alterarSenha(
    alterarSenha: AlterarSenha
  ): Observable<RetornoPadrao<AlterarSenha>> {
    return this.http
      .patch<RetornoPadrao<AlterarSenha>>(
        `${environment.apiUrl}/${PerfilService.API_PERFIL_ALTERAR_SENHA}`,
        alterarSenha,
        { headers: this.httpHeaders }
      )
      .pipe(
        retry(1),
        map(res => {
          return res;
        })
      );
  }

  ativarPerfil(
    status: any
  ): Observable<RetornoPadrao<Perfil>> {
    return this.http
      .patch<RetornoPadrao<Perfil>>(
        `${environment.apiUrl}/${PerfilService.API_PERFIL}/ativar/${status}`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        retry(1),
        map(res => {
          return res;
        })
      );
  }

  

}
