import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Faturamento } from '../models/faturamento.model';
import { Funcionalidade } from '../models/funcionalidade.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class FaturamentoService extends BaseApiService {

  public static API_FATURAMENTO: string = 'api/v1/faturamentos';
  public headers:HttpHeaders;

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Accept', 'application/json');

  }

  salvarFaturamento(
    faturamento: Faturamento
  ): Observable<RetornoPadrao<Faturamento>> {
    if(faturamento.id > 0){
      return this.atualizarFaturamento(faturamento);
    }else{
      return this.adicionarFaturamento(faturamento);
    }
  }

  adicionarFaturamento(
    faturamento: Faturamento
  ): Observable<RetornoPadrao<Faturamento>> {
    return this.http
      .post<RetornoPadrao<Faturamento>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}`,
        faturamento.data,
        { headers: this.headers }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarFaturamento(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterFaturamentos(): Observable<RetornoPadrao<GridRespModel<Faturamento>>> {

    return this.http
      .get<RetornoPadrao<GridRespModel<Faturamento>>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterFaturamentoId(id: number): Observable<RetornoPadrao<Faturamento>> {
    return this.http
      .get<RetornoPadrao<Faturamento>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  statusFaturamento(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Faturamento>> {
    return this.http
      .patch<RetornoPadrao<Faturamento>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  obterFuncionalidades(id:number): Observable<RetornoPadrao<GridRespModel<Funcionalidade>>> {

    return this.http
      .get<RetornoPadrao<GridRespModel<Funcionalidade>>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/${id}/funcionalidades`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  atualizarFuncionalidades(
    id: number,
    funcionalidades: Funcionalidade[]
  ): Observable<RetornoPadrao<Funcionalidade[]>> {
    return this.http
    .post<RetornoPadrao<Funcionalidade[]>>(
      `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/${id}/funcionalidades`,
      funcionalidades,
      { headers: this.httpHeaders }
    )
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  atualizarFaturamento(
    faturamento: Faturamento
  ): Observable<RetornoPadrao<Faturamento>> {
    return this.http
      .put<RetornoPadrao<Faturamento>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/${faturamento.id}`,
        faturamento,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalFaturamentos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${FaturamentoService.API_FATURAMENTO}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
