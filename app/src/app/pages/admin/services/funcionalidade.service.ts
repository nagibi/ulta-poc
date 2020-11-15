import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Funcionalidade } from '../models/funcionalidade.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class FuncionalidadeService extends BaseApiService {
  public static API_FUNCIONALIDADE: string = 'api/v1/funcionalidades';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarFuncionalidade(
    Funcionalidade: Funcionalidade
  ): Observable<RetornoPadrao<Funcionalidade>> {
    if(Funcionalidade.id > 0){
      return this.atualizarFuncionalidade(Funcionalidade);
    }else{
      return this.adicionarFuncionalidade(Funcionalidade);
    }
  }

  adicionarFuncionalidade(
    Funcionalidade: Funcionalidade
  ): Observable<RetornoPadrao<Funcionalidade>> {
    return this.http
      .post<RetornoPadrao<Funcionalidade>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}`,
        Funcionalidade,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarFuncionalidade(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterFuncionalidadeId(id: number): Observable<RetornoPadrao<Funcionalidade>> {
    return this.http
      .get<RetornoPadrao<Funcionalidade>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  statusFuncionalidade(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Funcionalidade>> {
    return this.http
      .patch<RetornoPadrao<Funcionalidade>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarFuncionalidade(
    Funcionalidade: Funcionalidade
  ): Observable<RetornoPadrao<Funcionalidade>> {
    return this.http
      .put<RetornoPadrao<Funcionalidade>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}/${Funcionalidade.id}`,
        Funcionalidade,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  obterFuncionalidades(): Observable<RetornoPadrao<GridRespModel<Funcionalidade>>> {
    
    return this.http
      .get<RetornoPadrao<GridRespModel<Funcionalidade>>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalFuncionalidades(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
