import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Funcionalidade } from '../models/funcionalidade.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';
import { DemonstrativoFaturamento } from '../models/demonstrativo-faturamento.model';

@Injectable({
  providedIn: 'root',
})
export class DemonstrativoFaturamentoService extends BaseApiService {

  public static API_FATURAMENTO: string = 'api/v1/demonstrativo-faturamentos';
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
    demonstrativoFaturamento: DemonstrativoFaturamento
  ): Observable<RetornoPadrao<DemonstrativoFaturamento>> {
    if(demonstrativoFaturamento.id > 0){
      return this.atualizarFaturamento(demonstrativoFaturamento);
    }else{
      return this.adicionarFaturamento(demonstrativoFaturamento);
    }
  }

  adicionarFaturamento(
    demonstrativoFaturamento: DemonstrativoFaturamento
  ): Observable<RetornoPadrao<DemonstrativoFaturamento>> {
    return this.http
      .post<RetornoPadrao<DemonstrativoFaturamento>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}`,
        demonstrativoFaturamento.data,
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
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterFaturamentos(): Observable<RetornoPadrao<GridRespModel<DemonstrativoFaturamento>>> {

    return this.http
      .get<RetornoPadrao<GridRespModel<DemonstrativoFaturamento>>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterFaturamentoId(id: number): Observable<RetornoPadrao<DemonstrativoFaturamento>> {
    return this.http
      .get<RetornoPadrao<DemonstrativoFaturamento>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/${id}`
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
  ): Observable<RetornoPadrao<DemonstrativoFaturamento>> {
    return this.http
      .patch<RetornoPadrao<DemonstrativoFaturamento>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/${id}/status`,
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
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/${id}/funcionalidades`
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
      `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/${id}/funcionalidades`,
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
    demonstrativoFaturamento: DemonstrativoFaturamento
  ): Observable<RetornoPadrao<DemonstrativoFaturamento>> {
    return this.http
      .put<RetornoPadrao<DemonstrativoFaturamento>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/${demonstrativoFaturamento.id}`,
        demonstrativoFaturamento,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalDemonstrativoFaturamentos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
