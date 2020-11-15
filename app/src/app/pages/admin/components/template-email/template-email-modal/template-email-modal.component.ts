import { Component, Input, OnInit, Output } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TemplateEmailService } from '../../../services/template-email.service';

@Component({
  selector: 'app-template-email-modal',
  templateUrl: './template-email-modal.component.html',
  styleUrls: ['./template-email-modal.component.css'],
})
export class TemplateEmailModalComponent extends FormBaseComponent
  implements OnInit {
  @Input() public modal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    protected fb: FormBuilder,
    protected templateEmailService: TemplateEmailService,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    super(fb, router, translateService, messageService, modalService);
  }

  ngOnInit() {
    this.msgsError = [];

    this.criarForm();
  }

  validar(): boolean {
    var controls = this.form.controls;

    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
      });

      this.messageService.create('MSG000034');

      return false;
    } else {
      return true;
    }
  }

  criarForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  submit() {
    
    if (this.validar()) {
      const dadosForm = this.form.value;

      this.templateEmailService
        .enviarEmail(this.modal.id, dadosForm.email)
        .subscribe((resp) => {

          this.messageService.create(resp.message);

          if(resp.message == 'MSG000148'){
            this.activeModal.close();
          }
        });
    }
  }
}
