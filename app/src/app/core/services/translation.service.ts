import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
  lang: string;
  data: Object;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private langIds: any = [];

  constructor(private translate: TranslateService) {

     let languageSelected = this.getIdiomaSelecionado();
     if(languageSelected==null){
      this.translate.addLangs(['pt']);
      this.translate.setDefaultLang('pt');
     } else{
      this.translate.addLangs([languageSelected]);
      this.translate.setDefaultLang(languageSelected);
  
     }

  }

  carregarIdioma(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach(locale => {
      this.translate.setTranslation(locale.lang, locale.data, true);

      this.langIds.push(locale.lang);
    });

    this.translate.addLangs(this.langIds);
  }

  setIdioma(lang) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      localStorage.setItem('language', lang);
    }
  }

  getIdiomaSelecionado(): any {
    return localStorage.getItem('language') || this.translate.getDefaultLang();
  }
}
