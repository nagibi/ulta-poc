import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TemplateEmailService } from './services/template-email.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSelectModule } from 'ngx-select-ex';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TemplateEmailPesquisarComponent } from './components/template-email/template-email-pesquisar/template-email-pesquisar.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TemplateEmailFormComponent } from './components/template-email/template-email-form/template-email-form.component';
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
import { TemplateEmailModalComponent } from './components/template-email/template-email-modal/template-email-modal.component';
import { DocumentoFormComponent } from './components/documento/documento-form/documento-form.component';
import { DocumentoPesquisarComponent } from './components/documento/documento-pesquisar/documento-pesquisar.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioPesquisarComponent } from './components/usuario/usuario-pesquisar/usuario-pesquisar.component';
import { GrupoFormComponent } from './components/grupo/grupo-form/grupo-form.component';
import { GrupoPesquisarComponent } from './components/grupo/grupo-pesquisar/grupo-pesquisar.component';
import { FuncionalidadePesquisarComponent } from './components/funcionalidade/funcionalidade-pesquisar/funcionalidade-pesquisar.component';
import { FuncionalidadeFormComponent } from './components/funcionalidade/funcionalidade-form/funcionalidade-form.component';
import { GrupoService } from './services/grupo.service';
import { DocumentoService } from './services/documento.service';
import { FuncionalidadeService } from './services/funcionalidade.service';
import { ArquivoPesquisarComponent } from './components/arquivo/arquivo-pesquisar/arquivo-pesquisar.component';
import { ArquivoFormComponent } from './components/arquivo/arquivo-form/arquivo-form.component';
import { BairroPesquisarComponent } from './components/bairro/bairro-pesquisar/bairro-pesquisar.component';
import { BairroFormComponent } from './components/bairro/bairro-form/bairro-form.component';
import { BairroService } from './services/bairro.service';
import { ArquivoService } from 'src/app/core/services/arquivo.service';
import { ThemeModule } from 'src/app/theme/theme.module';
import { FaturamentoService } from './services/faturamento.service';
import { DemonstrativoFaturamentoService } from './services/demonstrativo-faturamento.service';
import { FaturamentoPesquisarComponent } from './components/faturamento/faturamento-pesquisar/faturamento-pesquisar.component';
import { FaturamentoFormComponent } from './components/faturamento/faturamento-form/faturamento-form.component';
import { DemonstrativoFaturamentoPesquisarComponent } from './components/demonstrativo-faturamento/demonstrativo-faturamento-pesquisar.component';

// const modules = [
//   MatButtonModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatRippleModule,
//   MatSnackBarModule,
//   MatSliderModule,
//   MatCardModule,
// ];

@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CoreModule,
    ThemeModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    NgxMaskModule.forRoot(),
    NgxSelectModule,
    ImageCropperModule,
  ],
  exports:[],
  declarations: [
    AdminComponent,
    DashboardComponent,
    TemplateEmailFormComponent,
    TemplateEmailPesquisarComponent,
    TemplateEmailModalComponent,
    UsuarioFormComponent,
    UsuarioPesquisarComponent,
    GrupoFormComponent,
    GrupoPesquisarComponent,
    FuncionalidadePesquisarComponent,
    FuncionalidadeFormComponent,
    BairroFormComponent,
    BairroPesquisarComponent,
    ArquivoFormComponent,
    ArquivoPesquisarComponent,
    DocumentoFormComponent,
    DocumentoPesquisarComponent,
    FaturamentoFormComponent,
    FaturamentoPesquisarComponent,
    DemonstrativoFaturamentoPesquisarComponent,
    
  ],
  providers: [
    TemplateEmailService,
    GrupoService,
    FuncionalidadeService,
    BairroService,
    ArquivoService,
    DocumentoService,
    FaturamentoService,
    DemonstrativoFaturamentoService,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
  ],
})
export class AdminModule {}
