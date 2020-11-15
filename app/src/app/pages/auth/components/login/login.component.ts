import { Component, OnInit, Compiler } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { Login } from '../../models/login.model';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { MessageService } from 'src/app/core/services/message.service';
import { Erro } from 'src/app/core/models/erro.model';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  public qtdCaracters = 6;
  public static ROTA: string = '/auth/login';
  public idiomaList: any[] = [];
  public isLoader:boolean=false;

  constructor(
    private _compiler: Compiler,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    private translationService: TranslationService
  ) {
    super(fb, router, translateService, messageService, modalService);
    this._compiler.clearCache();

    if (this.authService.usuarioLogadoValue) {
      this.router.navigate([AdminComponent.ROTA]);
    }
  }

  ngOnInit() {
    this.msgsError = [];

    this.translateService
      .get([
        'MSG000080.descricao',
        'MSG000081.descricao',
      ])
      .subscribe((mensagens) => {
        this.idiomaList.push(
          { id: 'pt', text: 'Português' },
          { id: 'en', text: 'Inglês' }
        );

        this.criarForm();
        this.verificarConfirmarCadastro();
      });
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

  verificarConfirmarCadastro() {
    this.activeRoute.queryParamMap.subscribe((params) => {
      var token = params.get('token');
      if (token) {
        this.authService.confirmarCadastro(token).subscribe(
          (res) => {

            this.messageService.create(res.message);
            // this.translate.get(res.message).subscribe((mensagem: any) => {
            //   this.toastService.error(mensagem.descricao);
            // });
          },
          (erro: Erro) => {
            this.messageService.create(erro.message);
          }
        );
      }
    });
  }

  criarForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      idioma: [
        this.translationService.getIdiomaSelecionado(),
        Validators.compose([Validators.required]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.qtdCaracters),
          Validators.maxLength(this.qtdCaracters),
        ]),
      ],
    });
  }

  idiomaSelected(value: any) {
    this.translationService.setIdioma(value);
  }

  submit() {
    if (this.validar()) {

      this.isLoader = true;

      const dadosForm = this.form.value;
      const model = new Login(dadosForm.email, dadosForm.senha);

      this.authService.login(model.email, model.senha).subscribe(
        (resp) => {
          if (resp) {
            this.messageService.create(resp.message,resp.result.nome.toUpperCase());

            //this.translateService.get('MSG000032', {value: resp.result.nome.toUpperCase()})
            this.router.navigate([AdminComponent.ROTA]);
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

  // open() {
  //   const modalRef = this.modalService.open(ModalComponent, this.modalOptions);
  //   modalRef.componentInstance.modal = this.modal;
  //   modalRef.result.then(
  //     (result) => {
  //       debugger;
  //     },
  //     (close) => {
  //       debugger;
  //     }
  //   );

  // let modalRef:any = this.modalService.open(ModalComponent).result.then((result) => {
  //   debugger
  //   this.closeResult = `Closed with: ${result}`;
  // }, (reason) => {
  //   debugger
  //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  // });

  // modalRef.componentInstance.title = 'bbbbbbbbb';
  // }
}
