import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetornoPadrao } from '../models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { retry, map } from 'rxjs/operators';
import { Enum } from '../models/enum.model';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {

  protected httpHeaders: HttpHeaders;
  public static API_SEXO: string = 'api/v1/enums/sexo';
  public static API_TIPO_DOCUMENTO: string = 'api/v1/enums/tipo-documento';
  public static API_SIM_NAO: string = 'api/v1/enums/sim-nao';
  public static API_STATUS: string = 'api/v1/enums/status';
  public static API_STATUS_DOCUMENTO: string = 'api/v1/enums/status-documento';
  public static API_TIPO_ARQUIVO: string = 'api/v1/enums/tipo-arquivo';
  public static API_TIPO_TELEFONE: string = 'api/v1/enums/tipo-telefone';
  public static API_TIPO_ENDERECO: string = 'apiv1//enums/tipo-endereco';

  constructor(
    protected http: HttpClient,) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  // handleError(resp: HttpErrorResponse) {
  //   let error:Erro = new Erro();
  //   error.url = resp.url;
  //   error.result = resp;
  //   error.statusCode =resp.status;
  //   error.message =resp.message;

  //   var dataError = resp.error;
  //   if (dataError) {
  //     // Erro ocorreu no lado do client

  //     error.errors = dataError.errors;
  //     error.message = dataError.message;
  //     error.statusCode =dataError.statusCode;
  //     error.status =dataError.status;
  //     error.result =dataError.result;

  //   }
  //   // else {
  //   //   // Erro ocorreu no lado do servidor
  //   //   error =
  //   //     `Código do erro: ${resp.status}, ` + `menssagem: ${resp.message}`;
  //   // }
  //   console.log(error);
  //   return throwError(error);
  // }

  obterSexo(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_SEXO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterStatus(): Observable<RetornoPadrao<Enum[]>> {

    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_STATUS}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterStatusDocumento(): Observable<RetornoPadrao<Enum[]>> {

    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_STATUS_DOCUMENTO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterSimNao(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_SIM_NAO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterTipoArquivo(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_TIPO_ARQUIVO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterTipoDocumento(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_TIPO_DOCUMENTO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }


  obterTipoTelefones(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_TIPO_TELEFONE}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }

  obterTipoEnderecos(): Observable<RetornoPadrao<Enum[]>> {
    return this.http
      .get<RetornoPadrao<Enum[]>>(
        `${environment.apiUrl}/${BaseApiService.API_TIPO_ENDERECO}`
      )
      .pipe(
        retry(2),
        map(res => {
          return res;
        })
      );
  }
}
