import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { PerfilService } from './services/perfil.service';
import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import {
  I18n,
  CustomDatepickerI18n,
} from 'src/app/core/custom/customDatepickerI18n';
import { NgbDatePTParserFormatter } from 'src/app/core/custom/ngbDatePTParserFormatter';
import { NgxMaskModule } from 'ngx-mask'
import { NgxSelectModule } from 'ngx-select-ex';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { EnderecoPesquisarComponent } from './components/endereco/endereco-pesquisar/endereco-pesquisar.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { PerfilConfiguracaoComponent } from './components/perfil-configuracao/perfil-configuracao.component';
import { InformacaoPessoalComponent } from './components/informacao-pessoal/informacao-pessoal.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { TelefonePesquisarComponent } from './components/telefone/telefone-pesquisar/telefone-pesquisar.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  imports: [
    GoogleMapsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAnfAgMAUaZSg4Eu9V9AKGGD9zcdrbO-CI'}),
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    // https://stackoverflow.com/questions/38033723/angular-2-observable-subscription-not-triggering/38034298#38034298
    ThemeModule,
    TranslateModule.forChild(),
    NgxMaskModule.forRoot(),
    NgxSelectModule, 
    ImageCropperModule
  ],
  declarations: [
    PerfilComponent,
    EnderecoPesquisarComponent,
    EnderecoFormComponent,
    TelefonePesquisarComponent,
    TelefoneFormComponent,
    AlterarSenhaComponent,
    PerfilConfiguracaoComponent,
    InformacaoPessoalComponent,
  ],
  providers: [
    GoogleMapsAPIWrapper,
    PerfilService,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
  ],
})
export class PerfilModule {}
