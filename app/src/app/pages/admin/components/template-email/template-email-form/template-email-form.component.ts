import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { TemplateEmail } from '../../../models/template-email.model';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { TemplateEmailService } from '../../../services/template-email.service';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { TemplateEmailPesquisarComponent } from 'src/app/pages/admin/components/template-email/template-email-pesquisar/template-email-pesquisar.component';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { LabelType } from 'src/app/theme/models/label.model';

@Component({
  selector: 'app-template-email-form',
  templateUrl: './template-email-form.component.html',
  styleUrls: ['./template-email-form.component.css'],
})
export class TemplateEmailFormComponent extends FormBaseComponent
  implements OnInit {
  public dataNascimento: any;
  public registroAtual: TemplateEmail;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected templateEmailService: TemplateEmailService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService
  ) {
    super(fb, router, translateService, messageService, modalService);

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }
  ngOnInit() {

    this.translateService
      .get([
        'MSG000092.descricao',
        'MSG000118.descricao',
        'MSG000132.descricao',
        'MSG000133.descricao',
        'MSG000135.descricao',
        'MSG000136.descricao',
        'MSG000137.descricao',
        'MSG000138.descricao',
        'MSG000099.descricao',
        'MSG000141.descricao',
        'MSG000142.descricao',
        'MSG000149.descricao',
        'MSG000150.descricao',
        'MSG000155.descricao'
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;

        this.criarForm();
        this.criarSubheader();
        this.carregarPagina();
      });
  }

  criarForm() {
    this.form = this.fb.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      conteudo: [
        '',
        Validators.compose([Validators.required]),
      ],
      token: [''],

    });
  }

  carregarPagina() {
    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.caregarRegistro();
    });
  }

  criarSubheader() {
    //salvar
    this.btnSalvar = <Button>{
      text: this.mensagens['MSG000092.descricao'],
      type: ButtonType.LIGHT_PRIMARY,
      click: () => this.salvar(false),
      icon: 'flaticon2-writing',
    };

    //salvar & novo
    var btnSalvarNovo = <Button>{
      text: this.mensagens['MSG000133.descricao'],
      type: ButtonType.LIGHT_PRIMARY,
      click: () => this.salvar(true),
      icon: 'flaticon2-writing',
    };

    //salvar & continuar
    var btnSalvarContinuar = <Button>{
      text: this.mensagens['MSG000132.descricao'],
      type: ButtonType.LIGHT_PRIMARY,
      click: () => this.salvar(false),
      icon: 'flaticon2-medical-records',
    };

    this.btnSalvar.actions = [btnSalvarContinuar, btnSalvarNovo];

    //excluir
    this.btnExcluir = <Button>{
      text: this.mensagens['MSG000138.descricao'],
      type: ButtonType.LIGHT_DANGER,
      click: () => this.deletar(),
      icon: 'fa fa-trash-alt icon-sm',
      visible: false,
    };

    //inativar
    this.btnInativar = <Button>{
      text: this.mensagens['MSG000137.descricao'],
      type: ButtonType.LIGHT_DANGER,
      click: () => this.ativar(),
      icon: 'fa fa-thumbs-down icon-sm',
      visible: false,
    };

    //ativar
    this.btnAtivar = <Button>{
      text: this.mensagens['MSG000136.descricao'],
      type: ButtonType.LIGHT_SUCCESS,
      click: () => this.ativar(),
      icon: 'fa fa-thumbs-up icon-sm',
      visible: false,
    };

    //voltar
    var btnVoltar = <Button>{
      text: this.mensagens['MSG000155.descricao'],
      type: ButtonType.DEFAULT,
      click: () => {
        this.router.navigate([`${TemplateEmailPesquisarComponent.ROTA}`]);
      },
      icon: 'fa fa-reply-all icon-sm',
    };

    var buttons: Button[] = [
      btnVoltar,
      this.btnExcluir,
      this.btnAtivar,
      this.btnInativar,
      this.btnSalvar,
    ];

    this.subheader.buttons = buttons;
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  atualizarStatus() {
    this.label.visible = true;
    if (this.registroAtual.status == 1) {
      this.btnInativar.visible = true;
      this.btnAtivar.visible = false;
      this.label.text = this.mensagens['MSG000150.descricao'];
      this.label.type = LabelType.LIGHT_SUCCESS;
    } else {
      this.btnInativar.visible = false;
      this.btnAtivar.visible = true;
      this.label.text = this.mensagens['MSG000149.descricao'];
      this.label.type = LabelType.LIGHT_DANGER;
    }
  }

  caregarRegistro() {
    if (this.id) {
      this.templateEmailService.obterTemplateEmailId(this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;

          this.subheaderService.title = this.mensagens['MSG000099.descricao'];
          this.subheaderService.text = `${this.registroAtual.id} - ${this.registroAtual.nome}`;

          this.form.patchValue(resp.result);
        },
        (erro) => {
          this.setError(erro);
        },
        () => {}
      );
    } else {
      this.label.visible = false;
      this.subheaderService.title = this.mensagens['MSG000118.descricao'];
      this.subheaderService.text = this.mensagens['MSG000135.descricao'];
    }
  }

  ativar() {
    var template = this.registroAtual;
    template.status = this.registroAtual.status == 0 ? 1 : 0;
    this.templateEmailService
      .statusTemplateEmail(this.id, template.status)
      .subscribe(
        (resp) => {

          this.messageService.create(resp.message);
          this.registroAtual = resp.result;
          this.atualizarStatus();
        },
        (erro) => {
          this.setError(erro);
        }
      );
  }

  salvar(isNovo: boolean = false) {
    if (this.validar()) {
      const dadosForm = this.form.value;

      let model = new TemplateEmail();
      model.id = this.id;
      model.nome = dadosForm.nome;
      model.conteudo = dadosForm.conteudo;

      this.templateEmailService.salvarTemplateEmail(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            if (isNovo) {
              this.cancelar();
              this.router.navigate([
                `${TemplateEmailPesquisarComponent.ROTA}/novo`,
              ]);
            } else if (this.id != resp.result.id) {
              this.router.navigate([
                `${TemplateEmailPesquisarComponent.ROTA}/${resp.result.id}`,
              ]);
            }else{
              this.ngOnInit();
            }
          }
        },
        (erro) => {
          this.setError(erro);
        }
      );
    }
  }

  deletar() {
    const modalRef = this.modalService.open(ModalComponent, this.modalOptions);
    modalRef.componentInstance.modal = {
      title: this.mensagens['MSG000142.descricao'],
      conteudo: this.mensagens['MSG000141.descricao'],
    };
    modalRef.result.then(
      () => {
        this.templateEmailService.deletarTemplateEmail(this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([
                `${TemplateEmailPesquisarComponent.ROTA}/novo`,
              ]);
            }
          },
          (erro) => {
            this.setError(erro);
          }
        );
        this.messageService.create('MSG000144');
      },
      () => {}
    );
  }

  cancelar() {
    this.form.reset();
  }
}
