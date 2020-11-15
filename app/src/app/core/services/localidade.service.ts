import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseApiService } from './base.api.service';
import { RetornoPadrao } from '../models/retorno-padrao.model';
import { CepAberto } from '../models/localidade.model';

@Injectable({
  providedIn: 'root',
})
export class LocalidadeService extends BaseApiService {
  public static API_LOCALIDADE: string = 'api/v1/localidades';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  obterCep(cep:number): Observable<RetornoPadrao<CepAberto>> {
    return this.http
      .get<RetornoPadrao<CepAberto>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/cep/${cep}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterCepLatLgn(lat:number, lng:number): Observable<RetornoPadrao<CepAberto>> {
    return this.http
      .get<RetornoPadrao<CepAberto>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/cep?lat=${lat}&lng=${lng}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterEstadoId(uf: any): Observable<RetornoPadrao<any>> {
    return this.http
      .get<RetornoPadrao<any>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/estados/${uf}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterEstados(): Observable<RetornoPadrao<any[]>> {
    
    return this.http
      .get<RetornoPadrao<any[]>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/estados`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterMunicipioId(municipio: number): Observable<RetornoPadrao<any>> {
    return this.http
      .get<RetornoPadrao<any>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/municipios/${municipio}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  

  obterMunicipios(uf:any): Observable<RetornoPadrao<any[]>> {
    
    return this.http
      .get<RetornoPadrao<any[]>>(
        `${environment.apiUrl}/${LocalidadeService.API_LOCALIDADE}/estados/${uf}/municipios`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
