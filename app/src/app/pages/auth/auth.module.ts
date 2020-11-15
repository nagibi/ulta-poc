import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule, 
    TranslateModule.forChild(),
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    RegistrarComponent,
  ],
  providers: [
    
  ],
})
export class AuthModule {}
