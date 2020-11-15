import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { AlertService } from './alert.service';
import { ModalService } from './modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Mensagem } from '../models/mensagem.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private translateService: TranslateService,
    private toastService: ToastService,
    private alertService: AlertService,
    private modalService: ModalService
  ) {}

  create(messageCode: string, valor?: string) {
    
    if (messageCode != null && messageCode != '') {
      // this.translateService.get(messageCode+'.descricao',{value:valor}).subscribe(
      this.translateService.get(messageCode).subscribe(
        (message: Mensagem) => {
          
          if (valor != null) {
            this.translateService
              .get(messageCode + '.descricao', { value: valor })
              .subscribe((descricao: string) => {
                message.descricao = descricao;

                switch (message.tipo) {
                  case 'toast': {
                    this.createToast(message);
                    break;
                  }
                  case 'alert': {
                    this.createAlert(message);
                    break;
                  }
                  default: {
                    break;
                  }
                }
              });
          } else {
            switch (message.tipo) {
              case 'toast': {
                this.createToast(message);
                break;
              }
              case 'alert': {
                this.createAlert(message);
                break;
              }
              default: {
                break;
              }
            }
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  private createToast(message: Mensagem) {
    var timeClose =
      message.config != null && message.config['timeClose'] != null
        ? message.config['timeClose']
        : 3000;

    switch (message.tipoInfo) {
      case 'light':
        this.toastService.light(message.descricao, timeClose);
        break;
      case 'danger':
        this.toastService.danger(message.descricao, timeClose);
        break;
      case 'primary':
        this.toastService.primary(message.descricao, timeClose);
        break;
      case 'secondary':
        this.toastService.secondary(message.descricao, timeClose);
        break;
      case 'warning':
        this.toastService.warning(message.descricao, timeClose);
        break;
      case 'success':
        this.toastService.success(message.descricao, timeClose);
        break;
      default:
        this.toastService.info(message.descricao, timeClose);

        break;
    }
  }

  private createAlert(message: Mensagem) {
    
    var timeClose =
      message.config != null && message.config['timeClose'] != null
        ? message.config['timeClose']
        : 3000;

    switch (message.tipoInfo) {
      case 'info':
        this.alertService.info(message.descricao, timeClose);
        break;
      case 'danger':
        this.alertService.danger(message.descricao, timeClose);
        break;
      case 'primary':
        this.alertService.primary(message.descricao, timeClose);
        break;
      case 'secondary':
        this.alertService.secondary(message.descricao, timeClose);
        break;
      case 'warning':
        this.alertService.warning(message.descricao, timeClose);
        break;
      case 'success':
        this.alertService.success(message.descricao, timeClose);
        break;
      default:
        this.alertService.info(message.descricao, timeClose);
        break;
    }
  }
}
