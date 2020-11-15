import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridService } from './services/grid.service';
import { SubheaderService } from './services/subheader.service';
import { components } from '.';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgbModule,
  NgbActiveModal,
  NgbDropdown,
} from '@ng-bootstrap/ng-bootstrap';

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
  declarations: [components],
  exports:[components],
  providers: [
    // GridService,
    // SubheaderService,
    // NgbActiveModal,
    // NgbDropdown,
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [ 
          GridService,
    SubheaderService,
    NgbActiveModal,
    NgbDropdown,
       ]                       
    };
  }
}
