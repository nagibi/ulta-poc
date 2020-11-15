import { Component, ViewChild, Inject } from '@angular/core';
import { TranslationService } from './core/services/translation.service';
import { LayoutService } from './core/services/layout.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ultragaz';

  private menu: HTMLElement;
  constructor(
    @Inject(DOCUMENT) document,
    private layoutService: LayoutService
  ) {
    document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
  }

  offClickHandler(event: any) {
    // this.menu = document.getElementById('kt_header');
    // if (!this.menu.contains(event.target)) {
    //   // this.layoutService.setUserProfile(false);
    //   this.menu.querySelectorAll('.menu-toggle').forEach(item=>{
    //     if(item.classList.contains('menu-item-open-dropdown')){
    //       item.classList.remove('menu-item-open-dropdown');
    //     }
    //     if(item.classList.contains('menu-item-hover')){
    //       item.classList.remove('menu-item-hover');
    //     }
    //   })
    // }
  }
}
