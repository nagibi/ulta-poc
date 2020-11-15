import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-language-selector',
  templateUrl: './top-bar-language.component.html',
  styleUrls: ['./top-bar-language.component.css']
})
export class TopBarLanguageComponent implements OnInit {

  idiomaSelecionado: string;
  static ICON_PATH: string = 'assets/media/svg/flags/';
  language: any;
  languages: any[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/226-united-states.svg'
    },
    {
      lang: 'ch',
      name: 'Mandarin',
      flag: './assets/media/svg/flags/015-china.svg'
    },
    {
      lang: 'es',
      name: 'Spanish',
      flag: './assets/media/svg/flags/128-spain.svg'
    },
    {
      lang: 'jp',
      name: 'Japanese',
      flag: './assets/media/svg/flags/063-japan.svg'
    },
    {
      lang: 'de',
      name: 'German',
      flag: './assets/media/svg/flags/162-germany.svg'
    },
    {
      lang: 'fr',
      name: 'French',
      flag: './assets/media/svg/flags/195-france.svg'
    },
  ];

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.idiomaSelecionado = this.translationService.getIdiomaSelecionado();

   }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {
        // this.setSelectedLanguage();
      });
  }

  onLanguageSelected(value: string) {
    this.idiomaSelecionado = value;
    this.translationService.setIdioma(this.idiomaSelecionado);
    window.location.reload();
  }
}
