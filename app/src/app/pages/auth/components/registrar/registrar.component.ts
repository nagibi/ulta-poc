import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
// import { UsuarioCadastrar } from '../../models/usuario-cadastrar.model';
import { confirmarSenhaValidator } from 'src/app/core/validators/confirmar-senha.validator';
import { LoginComponent } from '../login/login.component';
import { Erro } from 'src/app/core/models/erro.model';
import { Usuario, UsuarioAutenticado } from '../../models/usuario.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent extends FormBaseComponent implements OnInit {
  public static ROTA: string = '/auth/registrar';
  public qtdCaracters = 6;
  public isLoader: boolean = false;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
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
    this.form = this.fb.group(
      {
        nome: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        senha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(this.qtdCaracters),
            Validators.maxLength(this.qtdCaracters),
          ]),
        ],
        confirmarSenha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(this.qtdCaracters),
            Validators.maxLength(this.qtdCaracters),
          ]),
        ],
      },
      { validator: [confirmarSenhaValidator] }
    );
  }

  submit() {
    if (this.validar()) {

      const dadosForm = this.form.value;

      let usuario = new UsuarioAutenticado();
      usuario.nome = dadosForm.nome;
      usuario.email = dadosForm.email;
      usuario.senha = dadosForm.senha;
      usuario.confirmarSenha = dadosForm.confirmarSenha;

      this.isLoader = true;
      this.authService.registrar(usuario).subscribe(
        (resp) => {

          if (resp) {

            if (resp.message == 'MSG000039') {
              this.router.navigate([LoginComponent.ROTA]);
              this.messageService.create(resp.message);
            } else {

              this.messageService.create(resp.message);
              this.setControlInvalid('email', 'MSG000072');

              if (resp.message === 'MSG000259') {
                this.router.navigate([LoginComponent.ROTA]);
              }
            }
          }
          this.isLoader = false;
        },
        (erro: Erro) => {
          this.isLoader = false;
          this.messageService.create(erro.message);
        }, () => {
          this.isLoader = false;
        }
      );
    }
  }
}
