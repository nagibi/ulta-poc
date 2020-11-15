import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../../services/perfil.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { Erro } from 'src/app/core/models/erro.model';
import { confirmarSenhaValidator } from 'src/app/core/validators/confirmar-senha.validator';
import { AlterarSenha } from '../../models/alterar-senha.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { Subheader } from 'src/app/theme/models/subheader-item.model';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css'],
})
export class AlterarSenhaComponent extends FormBaseComponent implements OnInit {
  public qtdCaracters = 6;
  public static ROTA: string = '/admin/perfil/alterar-senha';

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected perfilService: PerfilService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService
  ) {
    super(fb, router, translateService, messageService, modalService);
  }

  ngOnInit() {
    this.msgsError = [];

    this.translateService
      .get([
        'MSG000092.descricao',
        'MSG000113.descricao',
        'MSG000119.descricao',
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
        this.criarForm();
        this.criarSubheader();
        this.carregarPagina();
      });
  }

  criarForm() {
    this.form = this.fb.group(
      {
        senhaAtual: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(this.qtdCaracters),
            Validators.maxLength(this.qtdCaracters),
          ]),
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

  carregarPagina() {}

  criarSubheader() {
    var btnSalvar = <Button>{
      text: this.mensagens['MSG000092.descricao'],
      type: ButtonType.SUCCESS,
      click: () => this.salvar(),
      icon: 'fa fa-check',
    };

    var buttons: Button[] = [btnSalvar];

    this.subheader = <Subheader>{
      title: this.mensagens['MSG000113.descricao'],
      buttons: buttons,
      label: this.label
    };

    this.subheaderService.create(this.subheader);
  }

  alterarSenha() {}

  salvar() {
    if (this.validar()) {
      const dadosForm = this.form.value;

      const model = new AlterarSenha(
        dadosForm.senhaAtual,
        dadosForm.senha,
        dadosForm.confirmarSenha
      );

      this.perfilService.alterarSenha(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);

          if (resp.message == 'MSG000127') this.form.reset();
        },
        (erro: Erro) => {
          this.setError(erro);
        }
      );
    }
  }
}
