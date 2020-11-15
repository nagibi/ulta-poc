import { Component, OnInit } from '@angular/core';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { environment } from 'src/environments/environment';
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
import { ToastService } from 'src/app/core/services/toast.service';
import { catchError } from 'rxjs/operators';
import { Grid } from 'src/app/theme/models/grid/grid.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { GridService } from 'src/app/theme/services/grid.service';
import { GridOptions } from 'src/app/theme/models/grid/grid-options.model';
import { GridColumn } from 'src/app/theme/models/grid/grid-column.model';
import { DemonstrativoFaturamentoService } from '../../services/demonstrativo-faturamento.service';
import { DocumentoService } from '../../services/documento.service';
import { DemonstrativoFaturamento, DemonstrativoFaturamentoGrid } from '../../models/demonstrativo-faturamento.model';

@Component({
  selector: 'app-demonstrativoFaturamento-pesquisar',
  templateUrl: './demonstrativo-faturamento-pesquisar.component.html',
  styleUrls: ['./demonstrativo-faturamento-pesquisar.component.css'],
})
export class DemonstrativoFaturamentoPesquisarComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/admin/demonstrativo-faturamento';
  private btnAtivar: Button;
  private btnInativar: Button;
  // private btnProcessar: Button;
  // private cadastrarBtn: Button;
  public grid: Grid;
  public statusList: any[] = [];
  public tipoList: any[] = [];

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
    protected demonstrativoFaturamentoService: DemonstrativoFaturamentoService,
    protected utilService: UtilService,
    protected documentoService: DocumentoService,
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

  carregarComboStatus(){
    this.demonstrativoFaturamentoService.obterStatus().subscribe(
      resp => {
        resp.result.forEach(data => {
          this.statusList.push({ id: data.valor, text: data.descricao });
        });
      },
      erro => {
        this.setError(erro);
      }
    );
  }

  carregarComboTipoFaturamento(){
    this.demonstrativoFaturamentoService.obterTipoArquivo().subscribe(
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

  criarForm() {
    this.form = this.fb.group({
      id: [''],
      descricao: [''],
      codigo: [''],
      valor: [''],
      dataInicial: [''],
      dataFinal: [''],
      valorInicial: [''],
      valorFinal: [''],
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
        'MSG000220.descricao',
        'MSG000142.descricao',
        'MSG000268.descricao',
        'MSG000136.descricao',
        'MSG000137.descricao',
        'MSG000267.descricao',
        'MSG000150.descricao',
        'MSG000149.descricao',
        'MSG000156.descricao',
        'MSG000159.descricao',
        'MSG000160.descricao',
        'MSG000161.descricao',
        'MSG000162.descricao',
        'MSG000283.descricao',
        'MSG000175.descricao',
        'MSG000176.descricao',
        "MSG000117.descricao",
        "MSG000204.descricao",
        "MSG000205.descricao",
        "MSG000212.descricao",
        "MSG000213.descricao",
        'MSG000159.descricao',
        'MSG000275.descricao',
        'MSG000235.descricao',
        'MSG000236.descricao',
        'MSG000237.descricao',
        'MSG000285.descricao',
        'MSG000258.descricao',
        'MSG000154.descricao',
        'MSG000279.descricao',
        'MSG000280.descricao'
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;

        this.carregarComboStatus();
        this.carregarComboTipoFaturamento();
        this.criarForm();
        this.criarSubheader();
        this.carregarPagina();
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
    // this.cadastrarBtn = <Button>{
    //   text: this.mensagens['MSG000154.descricao'],
    //   type: ButtonType.LIGHT_SUCCESS,
    //   click: () => {
    //     this.router.navigate([`${FaturamentoPesquisarComponent.ROTA}/novo`]);
    //   },
    //   icon: 'fa fa-plus icon-sm',
    // };

    //re-processar
    // this.btnProcessar = <Button>{
    //   text: this.mensagens['MSG000267.descricao'],
    //   type: ButtonType.LIGHT_PRIMARY,
    //   click: () => {
    //     this.reProcessar(this.gridService.gridDirective.itensSelecionados);
    //   },
    //   icon: 'fa fa-sync-alt icon-sm',
    //   visible: false,
    // };

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

    this.subheader.buttons = [
      // this.btnAtivar,
      // this.btnInativar,
      // this.btnProcessar,
      // this.cadastrarBtn,
    ];

    this.subheader.title = this.mensagens['MSG000283.descricao'];
    this.subheader.text = this.mensagens['MSG000176.descricao'];
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  carregarPagina() {

    // this.processarGridBtn = <Button>{
    //   icon: 'flaticon2-edit icon-nm',
    //   type: ButtonType.LIGHT_PRIMARY,
    //   visible: true,
    //   title: this.mensagens['MSG000175.descricao'],
    //   permission: ['demonstrativoFaturamento.cadastrar', 'demonstrativoFaturamento.atualizar'],
    //   click: (obj: DemonstrativoFaturamento) =>
    //     this.router.navigate([
    //       `${FaturamentoPesquisarComponent.ROTA}/${obj.id}`,
    //     ]),
    // };

    // this.reProcessarGridBtn = <Button>{
    //   icon: 'fa fa-sync icon-nm',
    //   type: ButtonType.LIGHT_PRIMARY,
    //   title: this.mensagens['MSG000267.descricao'],
    //   visible: true,
    //   permission: ['demonstrativoFaturamento.cadastrar', 'demonstrativoFaturamento.atualizar'],
    //   click: (obj: DemonstrativoFaturamento) => this.reProcessar([obj]),
    // };

    var gridOption: GridOptions = <GridOptions>new Object();
    // gridOption.apiServiceHttp = `${environment.apiUrl}/${DocumentoService.API_DOCUMENTO}/1/${FaturamentoService.API_FATURAMENTO}${window.location.search}`;
    
    this.activeRoute.params.subscribe((params) => {
      
      let id = params['id'];
      if(id!=null){
        gridOption.apiServiceHttp = `${environment.apiUrl}/${DocumentoService.API_DOCUMENTOS}/${id}/demonstrativo-faturamentos${window.location.search}`;
      }else{
        gridOption.apiServiceHttp = `${environment.apiUrl}/${DemonstrativoFaturamentoService.API_FATURAMENTO}${window.location.search}`;
      }
    });

    // gridOption.routeBase = 'admin/demonstrativoFaturamento';
    gridOption.orderBy = 'id';
    gridOption.orderType = 'desc';
    gridOption.columns = <GridColumn[]>[
      {
        field: 'id',
        fakeField: 'id',
        label: this.mensagens['MSG000156.descricao'],
        sortable: true,
      },
      {
        field: 'codigo',
        label: this.mensagens['MSG000285.descricao'],
        sortable: true,
        align: 'center',
      },
      {
        field: 'descricao',
        label: this.mensagens['MSG000220.descricao'],
        sortable: true,
      },
      {
        field: 'documentoId',
        fakeField: 'documentoGrid',
        label: this.mensagens['MSG000275.descricao'],
        sortable: true,
      },
      {
        field: 'data',
        label: this.mensagens['MSG000279.descricao'],
        sortable: true,
      },
      {
        field: 'valor',
        label: this.mensagens['MSG000280.descricao'],
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
      // {
      //   label: this.mensagens['MSG000162.descricao'],
      //   align: 'center',
      //   actions: [
      //     this.reProcessarGridBtn
      //   ],
      // },
    ];

    // gridOption.onError (err=>{
    //   var teste = err;
    // });

    gridOption.onSelectedItem = (itens: DemonstrativoFaturamento[]) => {

      // this.btnProcessar.visible = itens.length > 0;
      this.btnAtivar.visible = this.btnInativar.visible = false;

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

    gridOption.onBenforeData = (data: DemonstrativoFaturamento[]) => {
      var dados: DemonstrativoFaturamentoGrid[] = [];
      data.forEach(entity => {

        var dado:DemonstrativoFaturamentoGrid = <DemonstrativoFaturamentoGrid>entity;
        dado.statusGrid = this.utilService.createLabelStatus(entity.status);
        this.documentoService.obterDocumentoNome(entity.documentoId).subscribe(resp=>{
          dado.documentoGrid = resp.result;
        });

        dados.push(dado);
      });

      return dados;
    };

    this.grid = this.gridService;
    this.grid.create(gridOption);
    this.grid.search();
  }

  resetGrid(){
    this.btnAtivar.visible =false;
    this.btnInativar.visible =false;
    // this.btnProcessar.visible = false;
    this.gridService.search();
  }

  ativar(itens: DemonstrativoFaturamento[]) {
        var status = itens[0].status == 0 ? 1 : 0;
    var requisisoes = [];
    itens.forEach((item) => {
      requisisoes.push(
        this.demonstrativoFaturamentoService.statusFaturamento(item.id, status).pipe(catchError(erro => of(erro)))
      );
    });

    forkJoin(requisisoes).subscribe((x: RetornoPadrao<DemonstrativoFaturamento>[]) => {
            var resp = x[0];
      this.messageService.create(resp.message);
      this.resetGrid();
    });
  }

  cancelar() {
    this.form.reset();
    this.filtrarGrid(this.gridService);
  }

  reProcessar(itens: DemonstrativoFaturamento[]) {
    const modalRef = this.modalService.open(ModalComponent, this.modalOptions);
    modalRef.componentInstance.modal = {
      title: this.mensagens['MSG000142.descricao'],
      conteudo: this.mensagens['MSG000268.descricao'],
    };
    modalRef.result.then(
      () => {
        var registros = [];
        itens.forEach((item) => {
          registros.push(
            this.demonstrativoFaturamentoService.deletarFaturamento(item.id).pipe(catchError(erro => of(erro)))
          );
        });

        forkJoin(registros).subscribe((resp: RetornoPadrao<DemonstrativoFaturamento>[]) => {
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
