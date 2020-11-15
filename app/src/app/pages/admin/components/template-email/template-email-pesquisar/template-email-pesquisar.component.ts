import { Component, OnInit } from '@angular/core';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { environment } from 'src/environments/environment';
import { TemplateEmailService } from '../../../services/template-email.service';
import { TemplateEmail, TemplateEmailGrid } from '../../../models/template-email.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { UtilService } from 'src/app/core/services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { forkJoin, of } from 'rxjs';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { Enum } from 'src/app/core/models/enum.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { catchError } from 'rxjs/operators';
import { Grid } from 'src/app/theme/models/grid/grid.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { GridService } from 'src/app/theme/services/grid.service';
import { GridOptions } from 'src/app/theme/models/grid/grid-options.model';
import { GridColumn } from 'src/app/theme/models/grid/grid-column.model';

@Component({
  selector: 'app-template-email-pesquisar',
  templateUrl: './template-email-pesquisar.component.html',
  styleUrls: ['./template-email-pesquisar.component.css'],
})
export class TemplateEmailPesquisarComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/admin/template-email';
  private editarGridBtn: Button;
  private excluirGridBtn: Button;
  private ativarGridBtn: Button;
  private inativarGridBtn: Button;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnClonar: Button;
  public grid: Grid;
  statusList: any[] = [];
  // public grid1: Grid;

  constructor(
    protected toastService: ToastService,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected templateEmailService: TemplateEmailService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService,
    public gridService: GridService
  ) {
    super(
      fb,
      router,
      translateService,
      messageService,
      modalService,
      utilService
    );
  }

  criarForm() {
    this.form = this.fb.group({
      templateEmailId: [''],
      nome: [''],
      token: [''],
      status: [''],
      dataCriacaoInicial: [''],
      dataCriacaoFinal: [''],
      dataAtualizacaoInicial: [''],
      dataAtualizacaoFinal: [''],
    });
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };

    this.translateService
      .get([
        'MSG000154.descricao',
        'MSG000142.descricao',
        'MSG000141.descricao',
        'MSG000136.descricao',
        'MSG000137.descricao',
        'MSG000138.descricao',
        'MSG000156.descricao',
        'MSG000017.descricao',
        'MSG000158.descricao',
        'MSG000159.descricao',
        'MSG000160.descricao',
        'MSG000161.descricao',
        'MSG000162.descricao',
        'MSG000173.descricao',
        'MSG000174.descricao',
        'MSG000175.descricao',
        'MSG000176.descricao',
        "MSG000182.descricao"
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
        this.criarForm();
        this.criarSubheader();
        this.carregarPagina();
        // this.carregarPagina1();
      });
  }

  filtroAvancado() {
    //data criacao
    var isDataCriacaoValid: boolean = this.utilService.validarDataInicialFinal(
      this.form,
      'dataCriacaoInicial',
      'dataCriacaoFinal'
    );

    //data atualizacao
    var isDataAtualizacaoValid: boolean = this.utilService.validarDataInicialFinal(
      this.form,
      'dataAtualizacaoInicial',
      'dataAtualizacaoFinal'
    );

    if (isDataCriacaoValid && isDataAtualizacaoValid)
      this.filtrarGrid(this.gridService);
    else if (!isDataCriacaoValid) this.messageService.create('MSG000186');
    else this.messageService.create('MSG000187');
  }

  criarSubheader() {
    //cadastrar
    var cadastrarBtn = <Button>{
      text: this.mensagens['MSG000154.descricao'],
      type: ButtonType.LIGHT_SUCCESS,
      click: () => {
        this.router.navigate([`${TemplateEmailPesquisarComponent.ROTA}/novo`]);
      },
      icon: 'fa fa-plus icon-sm',
    };

    //excluir
    this.btnExcluir = <Button>{
      text: this.mensagens['MSG000138.descricao'],
      type: ButtonType.LIGHT_DANGER,
      click: () => {
        this.deletar(this.gridService.gridDirective.itensSelecionados);
      },
      icon: 'fa fa-trash-alt icon-sm',
      visible: false,
    };

    //inativar
    this.btnInativar = <Button>{
      text: this.mensagens['MSG000137.descricao'],
      type: ButtonType.LIGHT_DANGER,
      click: () =>
        this.ativar(this.gridService.gridDirective.itensSelecionados),
      icon: 'fa fa-thumbs-down icon-sm',
      visible: false,
    };

    //ativar
    this.btnAtivar = <Button>{
      text: this.mensagens['MSG000136.descricao'],
      type: ButtonType.LIGHT_SUCCESS,
      click: () =>
        this.ativar(this.gridService.gridDirective.itensSelecionados),
      icon: 'fa fa-thumbs-up icon-sm',
      visible: false,
    };

    //clonar
    this.btnClonar = <Button>{
      text: this.mensagens['MSG000182.descricao'],
      type: ButtonType.LIGHT_INFO,
      click: () =>
        this.clonar(this.gridService.gridDirective.itensSelecionados[0]),
      icon: 'fa fa-check-double icon-sm',
      visible: false,
    };

    this.subheader.buttons = [
      this.btnClonar,
      this.btnAtivar,
      this.btnInativar,
      this.btnExcluir,
      cadastrarBtn,
    ];
    this.subheader.title = this.mensagens['MSG000173.descricao'];
    this.subheader.text = this.mensagens['MSG000176.descricao'];
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  carregarPagina() {
    this.templateEmailService.obterStatus().subscribe(
      (resp) => {
        resp.result.forEach((data: Enum) => {
          this.statusList.push({ id: data.valor, text: data.descricao });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );

    this.editarGridBtn = <Button>{
      icon: 'flaticon2-edit icon-nm',
      type: ButtonType.LIGHT_PRIMARY,
      visible: true,
      title: this.mensagens['MSG000175.descricao'],
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: (obj: TemplateEmail) =>
        this.router.navigate([
          `${TemplateEmailPesquisarComponent.ROTA}/${obj.id}`,
        ]),
    };

    this.excluirGridBtn = <Button>{
      icon: 'fa fa-trash icon-nm',
      type: ButtonType.LIGHT_DANGER,
      title: this.mensagens['MSG000138.descricao'],
      visible: true,
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: (obj: TemplateEmail) => this.deletar([obj]),
    };

    this.ativarGridBtn = <Button>{
      icon: 'fa fa-thumbs-up icon-nm',
      type: ButtonType.LIGHT_SUCCESS,
      visible: false,
      beforeRender: () => {},
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: () => {},
    };

    this.inativarGridBtn = <Button>{
      icon: 'fa fa-thumbs-down icon-nm',
      type: ButtonType.LIGHT_DANGER,
      visible: false,
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: () => {
        debugger;
      },
    };

    var gridOption: GridOptions = <GridOptions>new Object();
    gridOption.apiServiceHttp = `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}${window.location.search}`;
    // gridOption.routeBase = 'admin/template-email';
    gridOption.orderBy = 'templateEmailId';
    gridOption.orderType = 'desc';
    gridOption.columns = <GridColumn[]>[
      {
        field: 'templateEmailId',
        fakeField: 'id',
        label: this.mensagens['MSG000156.descricao'],
        sortable: true,
      },
      {
        field: 'nome',
        label: this.mensagens['MSG000017.descricao'],
        sortable: true,
      },
      {
        field: 'token',
        label: this.mensagens['MSG000158.descricao'],
        sortable: true,
      },
      {
        field: 'status',
        fakeField: 'statusGrid',
        label: this.mensagens['MSG000159.descricao'],
        align: 'center',
        sortable: true,
      },
      {
        field: 'dataAtualizacao',
        label: this.mensagens['MSG000160.descricao'],
        align: 'center',
        sortable: true,
      },
      {
        field: 'dataCriacao',
        label: this.mensagens['MSG000161.descricao'],
        align: 'center',
        sortable: true,
      },
      {
        label: this.mensagens['MSG000162.descricao'],
        align: 'center',
        actions: [
          this.editarGridBtn,
          this.excluirGridBtn,
          this.ativarGridBtn,
          this.inativarGridBtn,
        ],
      },
    ];

    // gridOption.onError (err=>{
    //   var teste = err;
    // });

    gridOption.onSelectedItem = (itens: TemplateEmail[]) => {
      this.btnExcluir.visible = itens.length > 0;
      this.btnAtivar.visible = this.btnInativar.visible = false;
      this.btnClonar.visible = itens.length == 1;

      if (itens.length > 0) {

        var primeiroItem = itens[0];
        var isIguais = itens.every((item) => item.status == primeiroItem.status);

        if (isIguais) {
          if (primeiroItem.status == 1) {
            this.btnAtivar.visible = false;
            this.btnInativar.visible = true;
          } else {
            this.btnAtivar.visible = true;
            this.btnInativar.visible = false;
          }
        }
      }
    };

    gridOption.onBenforeData = (data: TemplateEmail[]) => {
      var dados: TemplateEmail[] = [];
      data.forEach((entity: TemplateEmail) => {
        var dado:TemplateEmailGrid = <TemplateEmailGrid>entity;
        dado.statusGrid = this.utilService.createLabelStatus(entity.status);

        dados.push(entity);
      });

      return dados;
    };

    this.grid = this.gridService;
    this.grid.create(gridOption);
    this.grid.search();
  }

  // carregarPagina1() {
  //   this.editarGridBtn = <Button>{
  //     icon: 'flaticon2-edit icon-nm',
  //     type: ButtonType.LIGHT_PRIMARY,
  //     visible: true,
  //     title: this.mensagens['MSG000175.descricao'],
  //     permission: ['usuario.cadastrar', 'usuario.atualizar'],
  //     click: (obj: TemplateEmail) =>
  //       this.router.navigate([
  //         `${TemplateEmailPesquisarComponent.ROTA}/${obj.id}`,
  //       ]),
  //   };

  //   this.excluirGridBtn = <Button>{
  //     icon: 'fa fa-trash icon-nm',
  //     type: ButtonType.LIGHT_DANGER,
  //     title: this.mensagens['MSG000138.descricao'],
  //     visible: true,
  //     permission: ['usuario.cadastrar', 'usuario.atualizar'],
  //     click: (obj: TemplateEmail) => this.deletar([obj]),
  //   };

  //   this.ativarGridBtn = <Button>{
  //     icon: 'fa fa-thumbs-up icon-nm',
  //     type: ButtonType.LIGHT_SUCCESS,
  //     visible: false,
  //     beforeRender: () => {
  //     },
  //     permission: ['usuario.cadastrar', 'usuario.atualizar'],
  //     click: () => {
  //     },
  //   };

  //   this.inativarGridBtn = <Button>{
  //     icon: 'fa fa-thumbs-down icon-nm',
  //     type: ButtonType.LIGHT_DANGER,
  //     visible: false,
  //     permission: ['usuario.cadastrar', 'usuario.atualizar'],
  //     click: () => {
  //       debugger;
  //     },
  //   };

  //   var gridOption: GridOptions = <GridOptions>new Object();
  //   gridOption.apiServiceHttp = `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}${window.location.search}`;
  //   // gridOption.routeBase = 'admin/template-email';
  //   gridOption.orderBy = 'templateEmailId';
  //   gridOption.orderType = 'desc';
  //   gridOption.columns = <GridColumn[]>[
  //     {
  //       field: 'templateEmailId',
  //       fakeField: 'id',
  //       label: this.mensagens['MSG000156.descricao'],
  //       sortable: true,
  //     },
  //     {
  //       field: 'nome',
  //       label: this.mensagens['MSG000017.descricao'],
  //       sortable: true,
  //     },
  //     {
  //       field: 'token',
  //       label: this.mensagens['MSG000158.descricao'],
  //       sortable: true,
  //     },
  //     {
  //       field: 'status',
  //       fakeField: 'statusGrid',
  //       label: this.mensagens['MSG000159.descricao'],
  //       align: 'center',
  //       sortable: true,
  //     },
  //     {
  //       field: 'dataAtualizacao',
  //       label: this.mensagens['MSG000160.descricao'],
  //       align: 'center',
  //       sortable: true,
  //     },
  //     {
  //       field: 'dataCriacao',
  //       label: this.mensagens['MSG000161.descricao'],
  //       align: 'center',
  //       sortable: true,
  //     },
  //     {
  //       label: this.mensagens['MSG000162.descricao'],
  //       align: 'center',
  //       actions: [
  //         this.editarGridBtn,
  //         this.excluirGridBtn,
  //         this.ativarGridBtn,
  //         this.inativarGridBtn,
  //       ],
  //     },
  //   ];

  //   // gridOption.onError (err=>{
  //   //   var teste = err;
  //   // });

  //   gridOption.onSelectedItem = (itens: TemplateEmail[]) => {
  //     this.btnExcluir.visible = itens.length > 0;

  //     if (itens.length == 1) {
  //       if (itens[0].status == 1) {
  //         this.btnAtivar.visible = false;
  //         this.btnInativar.visible = true;
  //       } else {
  //         this.btnAtivar.visible = true;
  //         this.btnInativar.visible = false;
  //       }
  //     } else {
  //       this.btnAtivar.visible = this.btnInativar.visible = false;
  //     }
  //   };

  //   gridOption.onBenforeData = (data: TemplateEmail[]) => {

  //     var dados: TemplateEmail[] = [];
  //     data.forEach((entity: TemplateEmail) => {
  //       if (entity.status == 1) {
  //         entity.statusGrid = `<span class="label font-weight-bold label-lg label-light-success label-inline" title="${this.mensagens['MSG000150.descricao']}">${this.mensagens['MSG000150.descricao']}</span>`;
  //       } else {
  //         entity.statusGrid = `<span class="label font-weight-bold label-lg label-light-danger label-inline" title="${this.mensagens['MSG000149.descricao']}">${this.mensagens['MSG000149.descricao']}</span>`;
  //       }

  //       dados.push(entity);
  //     });

  //     return dados;
  //   };

  //   this.grid1 = new GridService(this.http);
  //   this.grid1.create(gridOption);
  //   this.grid1.search();
  // }

  resetGrid(){
    this.btnClonar.visible =false;
    this.btnAtivar.visible =false;
    this.btnInativar.visible =false;
    this.btnExcluir.visible = false;
    this.gridService.search();
  }

  clonar(item:TemplateEmail){
    this.templateEmailService.clonarTemplateEmail(item.id).subscribe(result=>{

      this.messageService.create(result.message);
      if(result.message == 'MSG000167'){
        this.resetGrid();
      }
    })

  }

  ativar(itens: TemplateEmail[]) {
        var status = itens[0].status == 0 ? 1 : 0;
    var requisisoes = [];
    itens.forEach((item) => {
      requisisoes.push(
        this.templateEmailService.statusTemplateEmail(item.id, status).pipe(catchError(erro => of(erro)))
      );
    });

    forkJoin(requisisoes).subscribe((x: RetornoPadrao<TemplateEmail>[]) => {
            var resp = x[0];
      this.messageService.create(resp.message);
      this.resetGrid();
    });
    // this.templateEmailService
    //   .ativarTemplateEmail(template.id, template.status)
    //   .subscribe(
    //     (resp) => {
    //       this.messageService.create(resp.message);
    //       this.grid.search();
    //     },
    //     (erro) => {
    //       this.setError(erro);
    //     }
    //   );
  }

  cancelar() {
    this.form.reset();
    this.filtrarGrid(this.gridService);
  }

  deletar(itens: TemplateEmail[]) {
    const modalRef = this.modalService.open(ModalComponent, this.modalOptions);
    modalRef.componentInstance.modal = {
      title: this.mensagens['MSG000142.descricao'],
      conteudo: this.mensagens['MSG000141.descricao'],
    };
    modalRef.result.then(
      () => {
        var requisisoes = [];
        itens.forEach((item) => {
          requisisoes.push(
            this.templateEmailService.deletarTemplateEmail(item.id).pipe(catchError(erro => of(erro)))
          );
        });

        forkJoin(requisisoes).subscribe((resp: RetornoPadrao<TemplateEmail>[]) => {
          var indexError = resp.map(item=> {return item.status.toLowerCase()}).indexOf('erro');
          if(indexError> -1){
            this.messageService.create(resp[indexError].message);
          }else{
            this.messageService.create(resp[0].message);
          }
          this.resetGrid();
        });
      },
      () => {}
    );
  }
}
