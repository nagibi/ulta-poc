import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Telefone } from '../models/telefone.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';
import { UsuarioService } from '../../auth/services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class TelefoneService extends BaseApiService {

  public static API_TELEFONE: string = 'api/v1/telefones';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarTelefone(
    telefone: Telefone
  ): Observable<RetornoPadrao<Telefone>> {
    if(telefone.id > 0){
      return this.atualizarTelefone(telefone);
    }else{
      return this.adicionarTelefone(telefone);
    }
  }

  adicionarTelefone(
    telefone: Telefone
  ): Observable<RetornoPadrao<Telefone>> {
    return this.http
      .post<RetornoPadrao<Telefone>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${telefone.usuarioId}/telefones`,
        telefone,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarTelefone( usuarioId:number,
    telefoneId: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: telefoneId,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/telefones`,
        options
        )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTelefoneId( usuarioId:number,
    id: number): Observable<RetornoPadrao<Telefone>> {
    return this.http
      .get<RetornoPadrao<Telefone>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/telefones/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  statusTelefone(
    usuarioId:number,
    id: number,
    status: number
  ): Observable<RetornoPadrao<Telefone>> {
    return this.http
      .patch<RetornoPadrao<Telefone>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/telefones/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarTelefone(
    telefone: Telefone
  ): Observable<RetornoPadrao<Telefone>> {
    return this.http
      .put<RetornoPadrao<Telefone>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${telefone.usuarioId}/telefones/${telefone.id}`,
        telefone,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  obterTelefones(usuarioId:Number): Observable<RetornoPadrao<GridRespModel<Telefone>>> {
    
    return this.http
      .get<RetornoPadrao<GridRespModel<Telefone>>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/telefones`,
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalTelefones(usuarioId:number): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/telefones/total`,
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
