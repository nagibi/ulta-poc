import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { UsuarioPesquisarComponent } from 'src/app/pages/admin/components/usuario/usuario-pesquisar/usuario-pesquisar.component';
import { Usuario } from 'src/app/pages/auth/models/usuario.model';
import { UsuarioService } from 'src/app/pages/auth/services/usuario.service';
import { GrupoService } from '../../../services/grupo.service';
import * as moment from 'moment';
import { confirmarSenhaValidator } from 'src/app/core/validators/confirmar-senha.validator';
import { SubheaderService } from 'src/app/theme/services/subheader.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent extends FormBaseComponent implements OnInit {
  public dataNascimento: any;
  public registroAtual: Usuario;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;
  private btnRecuperarSenha: Button;
  public grupoList: any[] = [];
  public sexoList: any[] = [];
  public qtdCaracters = 6;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected usuarioService: UsuarioService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService,
    protected grupoService: GrupoService
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
        'MSG000055.descricao',
        'MSG000141.descricao',
        'MSG000142.descricao',
        'MSG000149.descricao',
        'MSG000150.descricao',
        'MSG000155.descricao',
        'MSG000183.descricao',
        'MSG000007.descricao',
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
        nome: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(100)]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        grupoId: ['', Validators.compose([Validators.required])],
        dataNascimento: ['', Validators.compose([Validators.required])],
        sexo: ['', Validators.compose([Validators.required])],
        confirmacaoEmail: [''],
        token: [''],
        arquivoId: [''],
        usuarioCriacaoId: [''],
        dataCriacao: [''],
        dataAtualizacao: [''],
        usuarioAtualizacaoId: [''],
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

  carregarComboGrupo() {
    this.grupoList = [];
    this.grupoService.obterGrupos().subscribe(
      (resp) => {
        resp.result.data.sort(this.utilService.dynamicSort('nome')).forEach(data => {
          this.grupoList.push({ id: data.id, text: data.nome });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }
  
  carregarComboSexo() {
    this.sexoList = [];
    this.usuarioService.obterSexo().subscribe(
      (resp) => {
        resp.result.sort(this.utilService.dynamicSort('descricao')).forEach(data => {
          this.sexoList.push({ id: data.valor, text: data.descricao });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  carregarPagina() {
    this.carregarComboGrupo();
    this.carregarComboSexo();

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

    //recuperarSenha
    this.btnRecuperarSenha = <Button>{
      text: this.mensagens['MSG000007.descricao'],
      type: ButtonType.LIGHT_INFO,
      click: () => this.recuperarSenha(),
      icon: 'fa fa-envelope-alt icon-sm',
      visible: false,
    };

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
        this.router.navigate([`${UsuarioPesquisarComponent.ROTA}`]);
      },
      icon: 'fa fa-reply-all icon-sm',
    };

    var buttons: Button[] = [
      btnVoltar,
      this.btnExcluir,
      this.btnRecuperarSenha,
      this.btnAtivar,
      this.btnInativar,
      this.btnSalvar,
    ];

    this.subheader.buttons = buttons;
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  atualizarStatus() {
    this.label.html = this.utilService.createLabelStatus(
      this.registroAtual.status
    );

    if (this.registroAtual.status == 1) {
      this.btnInativar.visible = true;
      this.btnAtivar.visible = false;
    } else {
      this.btnInativar.visible = false;
      this.btnAtivar.visible = true;
    }
  }

  caregarRegistro() {
    if (this.id) {
      this.usuarioService.obterUsuarioId(this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;
          this.btnRecuperarSenha.visible = true;

          this.subheaderService.title = this.mensagens['MSG000055.descricao'];
          this.subheaderService.text = `${this.registroAtual.id} - ${this.registroAtual.nome}`;
          resp.result.dataNascimento = this.utilService.getDate(
            resp.result.dataNascimento
          );

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
    this.usuarioService.statusUsuario(this.id, template.status).subscribe(
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

      let model = new Usuario();

      if (this.id > 0) {
        model.id = this.id;
        model.nome = dadosForm.nome;
        model.email = dadosForm.email;
        model.sexo = dadosForm.sexo;
        model.status = dadosForm.status;
        model.dataNascimento = dadosForm.dataNascimento;
        model.confirmacaoEmail = dadosForm.confirmacaoEmail;
        model.grupoId = dadosForm.grupoId;
        model.arquivoId = dadosForm.arquivoId;
        model.usuarioCriacaoId = dadosForm.usuarioCriacaoId;
        model.usuarioAtualizacaoId = dadosForm.usuarioAtualizacaoId;
        model.dataAtualizacao = dadosForm.dataAtualizacao;
        model.dataCriacao = dadosForm.dataCriacao;
        model.senha = dadosForm.senha;
        model.confirmarSenha = dadosForm.confirmarSenha;
      } else {
        model.nome = dadosForm.nome;
        model.email = dadosForm.email;
        model.sexo = dadosForm.sexo;
        model.dataNascimento = dadosForm.dataNascimento;
        model.grupoId = dadosForm.grupoId;
        model.senha = dadosForm.senha;
        model.confirmarSenha = dadosForm.confirmarSenha;
      }

      this.usuarioService.salvarUsuario(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            if (isNovo) {
              this.cancelar();
              this.router.navigate([`${UsuarioPesquisarComponent.ROTA}/novo`]);
            } else if (this.id != resp.result.id) {
              this.router.navigate([
                `${UsuarioPesquisarComponent.ROTA}/${resp.result.id}`,
              ]);
            } else {
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
        this.usuarioService.deletarUsuario(this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([`${UsuarioPesquisarComponent.ROTA}/novo`]);
            }
          },
          (erro) => {
            this.setError(erro);
          }
        );
      },
      () => {}
    );
  }

  recuperarSenha() {
    this.authService.recuperarSenha(this.registroAtual.email).subscribe(
      (resp) => {
        if (resp.message == 'MSG000047') resp.message = 'MSG000217';
        this.messageService.create(resp.message);
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  cancelar() {
    this.form.reset();
  }
}
