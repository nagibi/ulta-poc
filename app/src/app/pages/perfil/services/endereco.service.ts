import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Endereco } from '../models/endereco.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';
import { UsuarioService } from '../../auth/services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService extends BaseApiService {

  public static API_TELEFONE: string = 'api/v1/enderecos';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarEndereco(
    endereco: Endereco
  ): Observable<RetornoPadrao<Endereco>> {
    if(endereco.id > 0){
      return this.atualizarEndereco(endereco);
    }else{
      return this.adicionarEndereco(endereco);
    }
  }

  adicionarEndereco(
    endereco: Endereco
  ): Observable<RetornoPadrao<Endereco>> {
    return this.http
      .post<RetornoPadrao<Endereco>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${endereco.usuarioId}/enderecos`,
        endereco,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarEndereco( usuarioId:number,
    enderecoId: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: enderecoId,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/enderecos`,
        options
        )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterEnderecoId( usuarioId:number,
    id: number): Observable<RetornoPadrao<Endereco>> {
    return this.http
      .get<RetornoPadrao<Endereco>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/enderecos/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  statusEndereco(
    usuarioId:number,
    id: number,
    status: number
  ): Observable<RetornoPadrao<Endereco>> {
    return this.http
      .patch<RetornoPadrao<Endereco>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/enderecos/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarEndereco(
    endereco: Endereco
  ): Observable<RetornoPadrao<Endereco>> {
    return this.http
      .put<RetornoPadrao<Endereco>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${endereco.usuarioId}/enderecos/${endereco.id}`,
        endereco,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  obterEnderecos(usuarioId:Number): Observable<RetornoPadrao<GridRespModel<Endereco>>> {
    
    return this.http
      .get<RetornoPadrao<GridRespModel<Endereco>>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/enderecos`,
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalEnderecos(usuarioId:number): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${UsuarioService.API_USUARIOS}/${usuarioId}/enderecos/total`,
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
