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
import { GrupoService } from '../../../services/grupo.service';
import { Grupo, GrupoGrid } from '../../../models/grupo.model';
import { catchError } from 'rxjs/operators';
import { GridService } from 'src/app/theme/services/grid.service';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { Grid } from 'src/app/theme/models/grid/grid.model';
import { GridOptions } from 'src/app/theme/models/grid/grid-options.model';
import { GridColumn } from 'src/app/theme/models/grid/grid-column.model';

@Component({
  selector: 'app-grupo-pesquisar',
  templateUrl: './grupo-pesquisar.component.html',
  styleUrls: ['./grupo-pesquisar.component.css'],
})
export class GrupoPesquisarComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/admin/grupo';
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private editarGridBtn: Button;
  private excluirGridBtn: Button;
  public grid: Grid;
  public statusList: any[] = [];

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
    protected grupoService: GrupoService,
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

  carregarComboStatus(){
    this.grupoService.obterStatus().subscribe(
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

  criarForm() {
    this.form = this.fb.group({
      grupoId: [''],
      nome: [''],
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
        'MSG000017.descricao',
        'MSG000154.descricao',
        'MSG000142.descricao',
        'MSG000141.descricao',
        'MSG000136.descricao',
        'MSG000137.descricao',
        'MSG000138.descricao',
        'MSG000150.descricao',
        'MSG000149.descricao',
        'MSG000156.descricao',
        'MSG000159.descricao',
        'MSG000160.descricao',
        'MSG000161.descricao',
        'MSG000162.descricao',
        'MSG000056.descricao',
        'MSG000175.descricao',
        'MSG000176.descricao',
        "MSG000117.descricao",
        "MSG000204.descricao",
        "MSG000205.descricao",
        "MSG000212.descricao",
        "MSG000213.descricao"
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
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
    var cadastrarBtn = <Button>{
      text: this.mensagens['MSG000154.descricao'],
      type: ButtonType.LIGHT_SUCCESS,
      click: () => {
        this.router.navigate([`${GrupoPesquisarComponent.ROTA}/novo`]);
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

    this.subheader.buttons = [
      this.btnAtivar,
      this.btnInativar,
      this.btnExcluir,
      cadastrarBtn,
    ];
    this.subheader.title = this.mensagens['MSG000056.descricao'];
    this.subheader.text = this.mensagens['MSG000176.descricao'];
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  carregarPagina() {

    this.editarGridBtn = <Button>{
      icon: 'flaticon2-edit icon-nm',
      type: ButtonType.LIGHT_PRIMARY,
      visible: true,
      title: this.mensagens['MSG000175.descricao'],
      permission: ['grupo.cadastrar', 'grupo.atualizar'],
      click: (obj: Grupo) =>
        this.router.navigate([
          `${GrupoPesquisarComponent.ROTA}/${obj.id}`,
        ]),
    };

    this.excluirGridBtn = <Button>{
      icon: 'fa fa-trash icon-nm',
      type: ButtonType.LIGHT_DANGER,
      title: this.mensagens['MSG000138.descricao'],
      visible: true,
      permission: ['grupo.cadastrar', 'grupo.atualizar'],
      click: (obj: Grupo) => this.deletar([obj]),
    };

    this.carregarComboStatus();

    var gridOption: GridOptions = <GridOptions>new Object();
    gridOption.apiServiceHttp = `${environment.apiUrl}/${GrupoService.API_GRUPO}${window.location.search}`;
    // gridOption.routeBase = 'admin/grupo';
    gridOption.orderBy = 'grupoId';
    gridOption.orderType = 'desc';
    gridOption.columns = <GridColumn[]>[
      {
        field: 'grupoId',
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
          this.excluirGridBtn
        ],
      },
    ];

    // gridOption.onError (err=>{
    //   var teste = err;
    // });

    gridOption.onSelectedItem = (itens: Grupo[]) => {

      this.btnExcluir.visible = itens.length > 0;
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

    gridOption.onBenforeData = (data: Grupo[]) => {
      var dados: GrupoGrid[] = [];
      data.forEach(entity => {

        var dado:GrupoGrid = <GrupoGrid>entity;
          dado.statusGrid = this.utilService.createLabelStatus(entity.status);

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
    this.btnExcluir.visible = false;
    this.gridService.search();
  }

  ativar(itens: Grupo[]) {
        var status = itens[0].status == 0 ? 1 : 0;
    var requisisoes = [];
    itens.forEach((item) => {
      requisisoes.push(
        this.grupoService.statusGrupo(item.id, status).pipe(catchError(erro => of(erro)))
      );
    });

    forkJoin(requisisoes).subscribe((x: RetornoPadrao<Grupo>[]) => {
            var resp = x[0];
      this.messageService.create(resp.message);
      this.resetGrid();
    });
  }

  cancelar() {
    this.form.reset();
    this.filtrarGrid(this.gridService);
  }

  deletar(itens: Grupo[]) {
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
            this.grupoService.deletarGrupo(item.id).pipe(catchError(erro => of(erro)))
          );
        });

        forkJoin(requisisoes).subscribe((resp: RetornoPadrao<Grupo>[]) => {
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
