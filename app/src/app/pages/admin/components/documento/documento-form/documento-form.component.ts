import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { DocumentoPesquisarComponent } from 'src/app/pages/admin/components/documento/documento-pesquisar/documento-pesquisar.component';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { Documento } from '../../../models/documento.model';
import { DocumentoService } from '../../../services/documento.service';

@Component({
  selector: 'app-documento-form',
  templateUrl: './documento-form.component.html',
  styleUrls: ['./documento-form.component.css'],
})
export class DocumentoFormComponent extends FormBaseComponent implements OnInit {
  public registroAtual: Documento;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;
  public files:string  []  =  [];
  public tipoList: any[] = [];


  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected documentoService: DocumentoService,
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
        // name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
        file:  new  FormControl('',  [Validators.required]),
        tipo:  new  FormControl('',  [Validators.required]),
      }
    );
  }

  carregarPagina() {

    this.carregarComboTipo();

    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.caregarRegistro();
    });
  }

  carregarComboTipo() {
    this.tipoList = [];
    this.documentoService.obterTipoDocumento().subscribe(
      (resp) => {
        resp.result.sort(this.utilService.dynamicSort('descricao')).forEach(data => {
          this.tipoList.push({ id: data.valor, text: data.descricao });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );
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
      text: this.mensagens['MSG000092.descricao'],
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
        this.router.navigate([`${DocumentoPesquisarComponent.ROTA}`]);
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
  }

  caregarRegistro() {
    if (this.id) {
      this.documentoService.obterDocumentoId(this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;

          this.subheaderService.title = this.mensagens['MSG000055.descricao'];
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
    var documento = this.registroAtual;
    documento.status = this.registroAtual.status == 0 ? 1 : 0;
    this.documentoService.statusDocumento(this.id, documento.status).subscribe(
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


  onFileChange(event)  {
    this.files  =  [];
  for  (var i =  0; i <  event.target.files.length; i++)  {
      this.files.push(event.target.files[i]);
  }
}

  salvar(isNovo: boolean = false) {
    if (this.validar()) {

      const dadosForm = this.form.value;
      const formData =  new  FormData();

      for  (var i =  0; i <  this.files.length; i++)  {
          formData.append("file[]",  this.files[i]);
      }

      let documento = new Documento();
      documento.data = formData;
      documento.tipo = dadosForm.tipo;
      formData.append('tipo', dadosForm.tipo);
      
      this.documentoService.salvarDocumento(documento).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            
            if (isNovo) {
              this.cancelar();
              this.router.navigate([`${DocumentoPesquisarComponent.ROTA}/novo`]);
            } else {

              this.router.navigate([
                `${DocumentoPesquisarComponent.ROTA}`,
              ]);
            }
            // else {
            //   this.router.navigate([
            //     `${DocumentoPesquisarComponent.ROTA}` ]);
            //   // this.ngOnInit();
            // }
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
        this.documentoService.deletarDocumento(this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([`${DocumentoPesquisarComponent.ROTA}/novo`]);
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

  cancelar() {
    this.form.reset();
  }
}
