import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Bairro } from '../models/bairro.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class BairroService extends BaseApiService {
  public static API_BAIRRO: string = 'api/v1/bairros';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarBairro(
    Bairro: Bairro
  ): Observable<RetornoPadrao<Bairro>> {
    if(Bairro.id > 0){
      return this.atualizarBairro(Bairro);
    }else{
      return this.adicionarBairro(Bairro);
    }
  }

  adicionarBairro(
    Bairro: Bairro
  ): Observable<RetornoPadrao<Bairro>> {
    return this.http
      .post<RetornoPadrao<Bairro>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}`,
        Bairro,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarBairro(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterBairroId(id: number): Observable<RetornoPadrao<Bairro>> {
    return this.http
      .get<RetornoPadrao<Bairro>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  statusBairro(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Bairro>> {
    return this.http
      .patch<RetornoPadrao<Bairro>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarBairro(
    Bairro: Bairro
  ): Observable<RetornoPadrao<Bairro>> {
    return this.http
      .put<RetornoPadrao<Bairro>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}/${Bairro.id}`,
        Bairro,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  obterBairros(): Observable<RetornoPadrao<GridRespModel<Bairro>>> {
    
    return this.http
      .get<RetornoPadrao<GridRespModel<Bairro>>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalBairros(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${BairroService.API_BAIRRO}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
