import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { AlertService } from './services/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService } from './services/toast.service';
import { MessageService } from './services/message.service';
import { ModalService } from './services/modal.service';
import { FormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbActiveModal,
  NgbDropdown,
} from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from './services/layout.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseApiService } from './services/base.api.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ArquivoService } from './services/arquivo.service';
import { LocalidadeService } from './services/localidade.service';

@NgModule({
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    NgbModule,
    RouterModule, 
    FormsModule,
    ImageCropperModule,
    TranslateModule.forChild()
  ],
  exports: [components],
  declarations: [components],
  providers: [
    LocalidadeService,
    ArquivoService,
    BaseApiService,
    AlertService,
    ToastService,
    MessageService,
    ModalService,
    LayoutService,
    NgbActiveModal,
    NgbDropdown,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ 
       ]                       
    };
  }
}
