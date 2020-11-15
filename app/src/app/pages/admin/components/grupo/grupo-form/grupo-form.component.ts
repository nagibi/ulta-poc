import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { GrupoPesquisarComponent } from 'src/app/pages/admin/components/grupo/grupo-pesquisar/grupo-pesquisar.component';
import { GrupoService } from '../../../services/grupo.service';
import { Grupo } from '../../../models/grupo.model';
import { environment } from 'src/environments/environment';
import { FuncionalidadeService } from '../../../services/funcionalidade.service';
import { Funcionalidade } from '../../../models/funcionalidade.model';
import { HttpClient } from '@angular/common/http';
import { Grid } from 'src/app/theme/models/grid/grid.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { GridService } from 'src/app/theme/services/grid.service';
import { GridColumn } from 'src/app/theme/models/grid/grid-column.model';
import { GridOptions } from 'src/app/theme/models/grid/grid-options.model';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css'],
})
export class GrupoFormComponent extends FormBaseComponent implements OnInit {
  public registroAtual: Grupo;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;
  public grid: Grid;
  public formGrid: FormGroup;
  public funcionalidadesAssociadas: Funcionalidade[];
  private itensSelecionadosAoCarregarGrid:Funcionalidade[];

  constructor(
    protected httpClient: HttpClient,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected grupoService: GrupoService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService,
    public gridService: GridService
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
        'MSG000056.descricao',
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
      dataCriacao: [''],
      dataAtualizacao: [''],
      usuarioCriacaoId: [''],
      usuarioAtualizacaoId: [''],
    });

    this.formGrid = this.fb.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      descricao: [''],
      grupoId: [0],
      dataCriacaoInicial: [''],
      dataCriacaoFinal: [''],
      dataAtualizacaoInicial: [''],
      dataAtualizacaoFinal: [''],
    });
  }

  carregarPagina() {
    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];

      if (this.id > 0) {
        this.grupoService.obterFuncionalidades(this.id).subscribe((resp) => {
          this.funcionalidadesAssociadas = resp.result.data;
          this.createGrid();
        });
      }

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
        this.router.navigate([`${GrupoPesquisarComponent.ROTA}`]);
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
      this.grupoService.obterGrupoId(this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;

          this.subheaderService.title = this.mensagens['MSG000056.descricao'];
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
    this.grupoService.statusGrupo(this.id, template.status).subscribe(
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

      let model = new Grupo();

      if (this.id > 0) {
        model.id = this.id;
        model.nome = dadosForm.nome;

        this.itensSelecionadosAoCarregarGrid.forEach(itemSelecionado=>{
            var isExist = this.gridService.gridDirective.itensSelecionados.map(item=> {return item.id; }).indexOf(itemSelecionado.id);
            if(isExist == -1){
              this.funcionalidadesAssociadas = this.funcionalidadesAssociadas.filter(item => item.id != itemSelecionado.id);
            }
        });

        if(this.funcionalidadesAssociadas.length > 0){
          this.gridService.gridDirective.itensSelecionados.forEach(itemSelecionado=>{
            var isExist = this.funcionalidadesAssociadas.map(item=> {return item.id; }).indexOf(itemSelecionado.id);
            if(isExist == -1){
              this.funcionalidadesAssociadas.push(itemSelecionado);
            }
        });
        }else{
          this.funcionalidadesAssociadas = this.gridService.gridDirective.itensSelecionados;
        }

        // var funcionalidades = this.gridService.gridDirective.itensSelecionados.concat(this.funcionalidadesAssociadas);

        this.grupoService
          .atualizarFuncionalidades(this.id, this.funcionalidadesAssociadas)
          .subscribe(
            (resp) => {
              this.funcionalidadesAssociadas = resp.result;
            },
            (erro) => {
              this.setError(erro);
            }
          );
      } else {
        model.nome = dadosForm.nome;
      }

      this.grupoService.salvarGrupo(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            if (isNovo) {
              this.cancelar();
              this.router.navigate([`${GrupoPesquisarComponent.ROTA}/novo`]);
            } else if (this.id != resp.result.id) {
              this.router.navigate([
                `${GrupoPesquisarComponent.ROTA}/${resp.result.id}`,
              ]);
            } else {
              this.caregarRegistro();
              // this.grupoService.obterFuncionalidades(this.id).subscribe((resp) => {
              //   this.funcionalidadesAssociadas = resp.result.data;
              //   // this.grid.search();
              // });
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
        this.grupoService.deletarGrupo(this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([`${GrupoPesquisarComponent.ROTA}/novo`]);
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
    this.formGrid.reset();
    this.formGrid.controls['grupoId'].setValue(0);
    this.filtroAvancado();
  }

  createGrid() {
    var gridOption: GridOptions = <GridOptions>new Object();
    gridOption.apiServiceHttp = `${environment.apiUrl}/${FuncionalidadeService.API_FUNCIONALIDADE}${window.location.search}`;
    gridOption.orderBy = 'funcionalidadeId';
    // gridOption.isPaginate = false;
    gridOption.orderType = 'desc';
    gridOption.columns = <GridColumn[]>[
      {
        field: 'nome',
        label: this.mensagens['MSG000221.descricao'],
        sortable: true,
      },
      {
        field: 'descricao',
        label: this.mensagens['MSG000220.descricao'],
        sortable: true,
      },
    ];

    gridOption.onAfterData = (data: any[]) => {
      data.forEach((item) => {
        var isChecked = this.funcionalidadesAssociadas
          .map((funcionalidade) => {
            return funcionalidade.id;
          })
          .indexOf(item.id);
        if (isChecked != -1) {
          item.checked = true;
        this.gridService.gridDirective.itensSelecionados.push(item)
        }

        this.itensSelecionadosAoCarregarGrid = this.gridService.gridDirective.itensSelecionados.slice();
      });
    };

    gridOption.onSelectedItem = (itens: Funcionalidade[]) => {
      console.log('itensSelecionadosAoCarregarGrid: '+ this.itensSelecionadosAoCarregarGrid.map(item=>item.id))
      console.log('itensSelecionados:'+ itens.map(item=>item.id))
      console.log('funcionalidadesAssociadas:'+ this.funcionalidadesAssociadas.map(item=>item.id))
    };

    this.grid = this.gridService;
    this.grid.create(gridOption);
    this.grid.search();
  }

  filtroAvancado() {
    //data criacao
    var isDataCriacaoValid: boolean = this.utilService.validarDataInicialFinal(
      this.formGrid,
      'dataCriacaoInicial',
      'dataCriacaoFinal'
    );

    //data atualizacao
    var isDataAtualizacaoValid: boolean = this.utilService.validarDataInicialFinal(
      this.formGrid,
      'dataAtualizacaoInicial',
      'dataAtualizacaoFinal'
    );

    if (isDataCriacaoValid && isDataAtualizacaoValid)
      this.filtrarGrid(this.gridService, this.formGrid);
    else if (!isDataCriacaoValid) this.messageService.create('MSG000186');
    else this.messageService.create('MSG000187');
  }
}
