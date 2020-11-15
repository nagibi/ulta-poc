import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let usuarioAtual = this.authService.usuarioLogadoValue;
    if (usuarioAtual && usuarioAtual.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${usuarioAtual.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
