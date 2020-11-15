import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Documento } from '../models/documento.model';
import { Funcionalidade } from '../models/funcionalidade.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService extends BaseApiService {

  public static API_DOCUMENTOS: string = 'api/v1/documentos';
  public headers:HttpHeaders;

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Accept', 'application/json');

  }

  salvarDocumento(
    documento: Documento
  ): Observable<RetornoPadrao<Documento>> {
    if(documento.id > 0){
      return this.atualizarDocumento(documento);
    }else{
      return this.adicionarDocumento(documento);
    }
  }

  adicionarDocumento(
    documento: Documento
  ): Observable<RetornoPadrao<Documento>> {
    return this.http
      .post<RetornoPadrao<Documento>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}`,
        documento.data,
        { headers: this.headers }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarDocumento(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterDocumentos(): Observable<RetornoPadrao<GridRespModel<Documento>>> {

    return this.http
      .get<RetornoPadrao<GridRespModel<Documento>>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterDocumentoId(id: number): Observable<RetornoPadrao<Documento>> {
    return this.http
      .get<RetornoPadrao<Documento>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterDocumentoNome(id: number): Observable<RetornoPadrao<string>> {
    return this.http
      .get<RetornoPadrao<string>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}/nome`
      )
      .pipe(

        map((res: any) => {
          return res;
        })
      );
  }

  statusDocumento(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Documento>> {
    return this.http
      .patch<RetornoPadrao<Documento>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}/status`,
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
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}/funcionalidades`
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
      `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}/funcionalidades`,
      funcionalidades,
      { headers: this.httpHeaders }
    )
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  atualizarDocumento(
    documento: Documento
  ): Observable<RetornoPadrao<Documento>> {
    return this.http
      .put<RetornoPadrao<Documento>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${documento.id}`,
        documento,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalDocumentos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
