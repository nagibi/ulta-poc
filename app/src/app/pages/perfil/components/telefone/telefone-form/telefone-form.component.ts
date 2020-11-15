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
import { HttpClient } from '@angular/common/http';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { GridService } from 'src/app/theme/services/grid.service';
import { Telefone } from '../../../models/telefone.model';
import { TelefoneService } from '../../../services/telefone.service';
import { TelefonePesquisarComponent } from '../telefone-pesquisar/telefone-pesquisar.component';

@Component({
  selector: 'app-telefone-form',
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css'],
})
export class TelefoneFormComponent extends FormBaseComponent implements OnInit {
  public registroAtual: Telefone;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;
  private usuarioId:number;
  public tipoList: any[] = [];
  public qtdCaracters = 3;

  constructor(
    protected httpClient: HttpClient,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected telefoneService: TelefoneService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService,
    public gridService: GridService
  ) {
    super(fb, router, translateService, messageService, modalService);

    debugger
    this.usuarioId = this.authService.usuarioLogadoValue.id;

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }
  ngOnInit() {
    this.translateService
      .get([
        'MSG000156.descricao',
        'MSG000221.descricao',
        'MSG000092.descricao',
        'MSG000118.descricao',
        'MSG000132.descricao',
        'MSG000133.descricao',
        'MSG000135.descricao',
        'MSG000136.descricao',
        'MSG000137.descricao',
        'MSG000138.descricao',
        'MSG000098.descricao',
        'MSG000141.descricao',
        'MSG000142.descricao',
        'MSG000149.descricao',
        'MSG000150.descricao',
        'MSG000155.descricao',
        'MSG000183.descricao',
        'MSG000007.descricao',
        'MSG000220.descricao',
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
      ddd: [
        '',
        Validators.compose([
        Validators.minLength(this.qtdCaracters),
        Validators.maxLength(this.qtdCaracters),
        Validators.required
        ]),
      ],
      numero: [
        '',
        Validators.compose([Validators.required]),
      ],
      tipo: [
        '',
        Validators.compose([Validators.required]),
      ],
      dataCriacao: [''],
      dataAtualizacao: [''],
      usuarioCriacaoId: [''],
      usuarioAtualizacaoId: [''],
    });
  }

  carregarComboTipos(){
    this.telefoneService.obterTipoTelefones().subscribe(
      resp => {
        resp.result.forEach(data => {
          this.tipoList.push({ id: data.valor, text: data.descricao });
        });
      },
      erro => {
        this.setError(erro);
      }
    );
  }

  carregarPagina() {

    this.carregarComboTipos();

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
        this.router.navigate([`${TelefonePesquisarComponent.ROTA}`]);
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

    this.subheaderService.title = this.mensagens['MSG000118.descricao'];
    this.subheaderService.text = this.mensagens['MSG000135.descricao'];
  }

  caregarRegistro() {

    if (this.id) {
      this.telefoneService.obterTelefoneId(this.usuarioId, this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;

          this.subheaderService.title = this.mensagens['MSG000098.descricao'];
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
    this.telefoneService.statusTelefone(this.usuarioId,this.id, template.status).subscribe(
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

      let model = new Telefone();

      if (this.id > 0) {
        model.id = this.id;
      }

        model.nome = dadosForm.nome;
        model.ddd = dadosForm.ddd;
        model.numero = dadosForm.numero;
        model.tipo = dadosForm.tipo;
        model.usuarioId = this.usuarioId;
        model.usuarioCriacaoId = dadosForm.usuarioCriacaoId;
        model.usuarioAtualizacaoId = dadosForm.usuarioAtualizacaoId;
        model.dataCriacao = dadosForm.dataCriacao;
        model.dataAtualizacao = dadosForm.dataAtualizacao;

      this.telefoneService.salvarTelefone(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            if (isNovo) {
              this.cancelar();
              this.router.navigate([`${TelefonePesquisarComponent.ROTA}/novo`]);
            } else if (this.id != resp.result.id) {
              this.router.navigate([
                `${TelefonePesquisarComponent.ROTA}/${resp.result.id}`,
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
        this.telefoneService.deletarTelefone(this.usuarioId, this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([`${TelefonePesquisarComponent.ROTA}/novo`]);
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
