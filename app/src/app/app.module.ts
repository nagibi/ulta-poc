import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from './core/services/translation.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { FormsModule } from '@angular/forms';
import { UtilService } from './core/services/util.service';
import { AuthGuardService } from './pages/auth/services/auth-guard.service';
import { JwtInterceptor } from './core/intercepts/jwt-interceptor';
import { ToastService } from './core/services/toast.service';
import { ModalService } from './core/services/modal.service';
import { AlertService } from './core/services/alert.service';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from './core/services/message.service';
import { HttpErrorInterceptor } from './core/intercepts/http-error.interceptor';
import { AuthService } from './pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemeModule } from './theme/theme.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NoCacheHeadersInterceptor } from './core/intercepts/no-cache-headers.interceptor';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule,
  MatSliderModule,
  MatCardModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  exports:[],
  imports: [
    modules,
    GoogleMapsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAnfAgMAUaZSg4Eu9V9AKGGD9zcdrbO-CI'}),
    CoreModule,
    ThemeModule,
    LoadingBarHttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
  ],
  providers: [
    GoogleMapsAPIWrapper,
    TranslationService,
    ToastService,
    ModalService,
    AlertService,
    UtilService,
    MessageService,
    // NavigationPreloadManager,
    AuthGuardService,
    AuthService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [AuthService,MessageService,Router]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

