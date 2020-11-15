import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { Grupo } from '../models/grupo.model';
import { Funcionalidade } from '../models/funcionalidade.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class GrupoService extends BaseApiService {
  public static API_GRUPO: string = 'api/v1/grupos';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarGrupo(
    grupo: Grupo
  ): Observable<RetornoPadrao<Grupo>> {
    if(grupo.id > 0){
      return this.atualizarGrupo(grupo);
    }else{
      return this.adicionarGrupo(grupo);
    }
  }

  adicionarGrupo(
    grupo: Grupo
  ): Observable<RetornoPadrao<Grupo>> {
    return this.http
      .post<RetornoPadrao<Grupo>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}`,
        grupo,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarGrupo(id: number): Observable<RetornoPadrao<any>> {

    const options = {
      headers: this.httpHeaders,
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterGrupos(): Observable<RetornoPadrao<GridRespModel<Grupo>>> {

    return this.http
      .get<RetornoPadrao<GridRespModel<Grupo>>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterGrupoId(id: number): Observable<RetornoPadrao<Grupo>> {
    return this.http
      .get<RetornoPadrao<Grupo>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  statusGrupo(
    id: number,
    status: number
  ): Observable<RetornoPadrao<Grupo>> {
    return this.http
      .patch<RetornoPadrao<Grupo>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}/${id}/status`,
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
        `${environment.apiUrl}/${GrupoService.API_GRUPO}/${id}/funcionalidades`
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
      `${environment.apiUrl}/${GrupoService.API_GRUPO}/${id}/funcionalidades`,
      funcionalidades,
      { headers: this.httpHeaders }
    )
    .pipe(
      map((res) => {
        return res;
      })
    );
  }


  atualizarGrupo(
    grupo: Grupo
  ): Observable<RetornoPadrao<Grupo>> {
    return this.http
      .put<RetornoPadrao<Grupo>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}/${grupo.id}`,
        grupo,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalGrupos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${GrupoService.API_GRUPO}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
