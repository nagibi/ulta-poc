import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Arquivo } from '../models/arquivo.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService extends BaseApiService {
  public static API_ARQUIVO: string = 'api/v1/arquivos';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarArquivo(
    Arquivo: Arquivo
  ): Observable<RetornoPadrao<Arquivo>> {
    if(Arquivo.id > 0){
      return this.atualizarArquivo(Arquivo);
    }else{
      return this.adicionarArquivo(Arquivo);
    }
  }

  adicionarArquivo(
    Arquivo: Arquivo
  ): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .post<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`,
        Arquivo,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarArquivo(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterArquivoId(id: number): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .get<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  statusArquivo(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .patch<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarArquivo(
    Arquivo: Arquivo
  ): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .put<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/${Arquivo.id}`,
        Arquivo,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  obterArquivos(): Observable<RetornoPadrao<GridRespModel<Arquivo>>> {
    
    return this.http
      .get<RetornoPadrao<GridRespModel<Arquivo>>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalArquivos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
