import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private mensagens: any[];
  constructor(protected translateService: TranslateService) {
    this.translateService
      .get([
        'MSG000150.descricao',
        'MSG000149.descricao',
        'MSG000204.descricao',
        'MSG000205.descricao',
        'MSG000212.descricao',
        'MSG000213.descricao',
        'MSG000214.descricao',
        'MSG000215.descricao',
        'MSG000216.descricao',
        'MSG000218.descricao',
        'MSG000223.descricao',
        'MSG000238.descricao',
        'MSG000239.descricao',
        'MSG000247.descricao',
        'MSG000248.descricao',
        'MSG000263.descricao',
        'MSG000249.descricao',
        'MSG000264.descricao',
        'MSG000265.descricao',
        'MSG000266.descricao',
        'MSG000276.descricao',
        'MSG000278.descricao',
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
      });
  }


  dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  getDateObject(date: Date): any {
    if (date == null) return date;

    var ano = moment(date).format('YYYY');
    var mes = moment(date).format('MM');
    var dia = moment(date).format('DD');
    return {
      year: Number(ano),
      month: Number(mes),
      day: Number(dia),
    };
  }

  getDate(date: Date, format: string = 'YYYY-MM-DD'): any {
    if (date != null) {
      return moment(date).format(format);
    } else {
      return null;
    }
  }

  getDateString(date: any): string {
    if (date == null) return date;

    return `${date.year}-${date.month}-${date.day}`;
  }

  validarDataInicialFinal(
    form: FormGroup,
    dataInicial: any,
    dataFinal: any
  ): boolean {
    var dataInicial = form.controls[dataInicial].value;
    var dataFinal = form.controls[dataFinal].value;
    var isValid: boolean = true;
    // var dataCriacaoFinal = this.utilService.getDateString(this.form.controls['dataCriacaoFinal'].value);

    if (!isNaN(Date.parse(dataInicial)) && !isNaN(Date.parse(dataFinal))) {
      if (
        moment(`${dataInicial} 00:00:00`).isBefore(
          moment(`${dataFinal} 23:59:59`),
          'seconds'
        )
      ) {
        isValid = true;
      } else {
        isValid = false;
      }
    }

    return isValid;
  }

  createLabelStatus(status: any) {
    var value: string = '';
    switch (status) {
      case 1:
        value = `<span class="label font-weight-bold label-lg label-light-success label-inline" title="${this.mensagens['MSG000150.descricao']}">${this.mensagens['MSG000150.descricao']}</span>`;

        break;
      case 0:
        value = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000149.descricao']}">${this.mensagens['MSG000149.descricao']}</span>`;
        break;

      case 2:
        value = `<span class="label font-weight-bold label-lg label-light-warning label-inline" title="${this.mensagens['MSG000214.descricao']}">${this.mensagens['MSG000214.descricao']}</span>`;
        break;

      case 3:
        value = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000215.descricao']}">${this.mensagens['MSG000215.descricao']}</span>`;
        break;

      case 4:
        value = `<span class="label font-weight-bold label-lg label-light-secondary label-inline" title="${this.mensagens['MSG000216.descricao']}">${this.mensagens['MSG000216.descricao']}</span>`;
        break;

      default:
        break;
    }
    return value;
  }

  createLabelStatusDocumento(status: any) {
    var value: string = '';
    switch (status) {
      case 0:
        value = `<span class="label font-weight-bold label-lg label-light label-inline" title="${this.mensagens['MSG000263.descricao']}">${this.mensagens['MSG000263.descricao']}</span>`;
        break;

      case 2:
        value = `<span class="label font-weight-bold label-lg label-light-success label-inline" title="${this.mensagens['MSG000264.descricao']}">${this.mensagens['MSG000264.descricao']}</span>`;
        break;

      case 1:
        value = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000265.descricao']}">${this.mensagens['MSG000265.descricao']}</span>`;

        break;

      case 3:
        value = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000266.descricao']}">${this.mensagens['MSG000266.descricao']}</span>`;
        break;

      default:
        break;
    }
    return value;
  }

  createLabelTipoDocumento(tipo: any) {
    var value: string = '';
    switch (tipo) {
      case 0:
        value = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000276.descricao']}">${this.mensagens['MSG000276.descricao']}</span>`;
        break;

      case 1:
        value = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000278.descricao']}">${this.mensagens['MSG000278.descricao']}</span>`;

        break;

      default:
        break;
    }
    return value;
  }

  createLabelTipoArquivo(status: any) {
    var value: string = '';
    switch (status) {
      case 1:
        value = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000239.descricao']}">${this.mensagens['MSG000239.descricao']}</span>`;

        break;
      case 0:
        value = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000238.descricao']}">${this.mensagens['MSG000238.descricao']}</span>`;
        break;

      default:
        break;
    }
    return value;
  }

  createLabelTipoEndereco(status: any) {
    var value: string = '';
    switch (status) {
      case 1:
        value = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000239.descricao']}">${this.mensagens['MSG000239.descricao']}</span>`;

        break;
      case 0:
        value = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000238.descricao']}">${this.mensagens['MSG000238.descricao']}</span>`;
        break;

      default:
        break;
    }
    return value;
  }

  createLabelSimNao(value: any) {
    var str: string;
    if (Boolean(value)) {
      str = `<span class="label font-weight-bold label-lg label-light-success label-inline" title="${this.mensagens['MSG000212.descricao']}">${this.mensagens['MSG000212.descricao']}</span>`;
    } else {
      str = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000213.descricao']}">${this.mensagens['MSG000213.descricao']}</span>`;
    }
    return str;
  }

  createLabelSexo(value: any) {
    var str: string;
    switch (Number(value)) {
      case 1:
        str = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000204.descricao']}">${this.mensagens['MSG000204.descricao']}</span>`;
        break;
      case 2:
        str = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000218.descricao']}">${this.mensagens['MSG000218.descricao']}</span>`;
        break;
      case 0:
        str = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000223.descricao']}">${this.mensagens['MSG000223.descricao']}</span>`;
        break;
    }
    return str;
  }
  createLabelTipoTelefone(value: any) {
    var str: string;
    switch (Number(value)) {
      case 1:
        str = `<span class="label font-weight-bold label-lg label-light-primary label-inline" title="${this.mensagens['MSG000247.descricao']}">${this.mensagens['MSG000247.descricao']}</span>`;
        break;
      case 2:
        str = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000248.descricao']}">${this.mensagens['MSG000248.descricao']}</span>`;
        break;
      case 0:
        str = `<span class="label font-weight-bold label-lg label-light-info label-inline" title="${this.mensagens['MSG000249.descricao']}">${this.mensagens['MSG000249.descricao']}</span>`;
        break;
    }
    return str;
  }
}
