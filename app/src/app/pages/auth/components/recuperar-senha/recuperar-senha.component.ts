import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'src/app/core/services/message.service';
import { Erro } from 'src/app/core/models/erro.model';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'],
})
export class RecuperarSenhaComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/auth/recuperar-senha';
  public isLoader:boolean=false;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected toastService: ToastService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected messageService: MessageService,
    protected modalService: NgbModal
  ) {
    super(fb, router, translateService, messageService, modalService);

    if (this.authService.usuarioLogadoValue) {
      this.router.navigate([AdminComponent.ROTA]);
    }
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
      const email = dadosForm.email;
      
      this.isLoader = true;
      this.authService.recuperarSenha(email).subscribe(
        (resp) => {
          if (resp) {
            this.messageService.create(resp.message);

            if (resp.message == 'MSG000047') {
              this.router.navigate([LoginComponent.ROTA]);
            }else {
              this.setControlInvalid('email','MSG000071');
            }
          }
          this.isLoader = false;
        },
        (erro: Erro) => {
          this.isLoader = false;
          this.messageService.create(erro.message);
        },()=>{
          this.isLoader = false;
        }
      );
    }
  }
}
