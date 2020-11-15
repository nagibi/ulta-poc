import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoPadrao } from '../../../core/models/retorno-padrao.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../../../core/services/base.api.service';
import { TemplateEmail } from '../models/template-email.model';
import { GridRespModel } from 'src/app/theme/models/grid/grid-resp-model';

@Injectable({
  providedIn: 'root',
})
export class TemplateEmailService extends BaseApiService {
  public static API_TEMPLATE_EMAIL: string = 'api/v1/template-emails';

  constructor(protected http: HttpClient) {
    super(http);

    this.httpHeaders = new HttpHeaders();
    this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
  }

  salvarTemplateEmail(
    templateEmail: TemplateEmail
  ): Observable<RetornoPadrao<TemplateEmail>> {
    if(templateEmail.id > 0){
      return this.atualizarTemplateEmail(templateEmail);
    }else{
      return this.adicionarTemplateEmail(templateEmail);
    }
  }

  adicionarTemplateEmail(
    templateEmail: TemplateEmail
  ): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
      .post<RetornoPadrao<TemplateEmail>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}`,
        templateEmail,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  enviarEmail(
    id: number,
    email:string
  ): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
      .post<RetornoPadrao<TemplateEmail>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/${id}/enviar-email`,
        JSON.stringify(email),
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deletarTemplateEmail(id: number): Observable<RetornoPadrao<any>> {
    
    const options = {
      headers: this.httpHeaders,
      // body: { id: id },
      body: id,
    };

    return this.http
      .delete<RetornoPadrao<any>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}`,options
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTemplateEmails(): Observable<RetornoPadrao<GridRespModel<TemplateEmail>>> {
    return this.http
      .get<RetornoPadrao<GridRespModel<TemplateEmail>>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTemplateEmailId(id: number): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
      .get<RetornoPadrao<TemplateEmail>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  statusTemplateEmail(
    id: number,
    status: number
  ): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
      .patch<RetornoPadrao<TemplateEmail>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/${id}/status`,
        status,
        { headers: this.httpHeaders }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  clonarTemplateEmail(
    id: number
  ): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
    .get<RetornoPadrao<TemplateEmail>>(
      `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/${id}/clonar`
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  atualizarTemplateEmail(
    templateEmail: TemplateEmail
  ): Observable<RetornoPadrao<TemplateEmail>> {
    return this.http
      .put<RetornoPadrao<TemplateEmail>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/${templateEmail.id}`,
        templateEmail,
        { headers: this.httpHeaders }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  obterTotalTemplateEmails(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(
        `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}/total`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
