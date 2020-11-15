import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Erro } from '../models/erro.model';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/components/login/login.component';
import { MessageService } from '../services/message.service';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((resp: HttpErrorResponse) => {
        
        if (resp.status == 401) {
          this.messageService.create('MSG000128');
          this.authService.logout();
          this.router.navigate([LoginComponent.ROTA]);
          return throwError(resp);
        } else if (resp.status == 0 || resp.status === null) {
          this.messageService.create('MSG000130');
        }

        let error: Erro = new Erro();
        error.url = resp.url;
        error.result = resp;
        error.statusCode = resp.status;
        error.message = resp.message;

        var dataError = resp.error;
        if (dataError) {
          // Erro ocorreu no lado do client

          error.errors = dataError.errors;
          error.message = dataError.message;
          error.statusCode = dataError.statusCode;
          error.status = dataError.status;
          error.result = dataError.result;
        }

        console.log(error);
        return throwError(error);
      })
    );
  }
}
