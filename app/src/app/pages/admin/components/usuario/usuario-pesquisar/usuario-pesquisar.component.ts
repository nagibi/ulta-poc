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
import { Usuario, UsuarioGrid } from 'src/app/pages/auth/models/usuario.model';
import { UsuarioService } from 'src/app/pages/auth/services/usuario.service';
import { GrupoService } from '../../../services/grupo.service';
import { catchError } from 'rxjs/operators';
import { Grid } from 'src/app/theme/models/grid/grid.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { GridService } from 'src/app/theme/services/grid.service';
import { GridOptions } from 'src/app/theme/models/grid/grid-options.model';
import { GridColumn } from 'src/app/theme/models/grid/grid-column.model';

@Component({
  selector: 'app-usuario-pesquisar',
  templateUrl: './usuario-pesquisar.component.html',
  styleUrls: ['./usuario-pesquisar.component.css'],
})
export class UsuarioPesquisarComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/admin/usuario';
  private btnAtivar: Button;
  private btnRecuperarSenha: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private editarGridBtn: Button;
  private excluirGridBtn: Button;
  public grid: Grid;
  public sexoList: any[] = [];
  public statusList: any[] = [];
  public grupoList: any[] = [];

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
    protected usuarioService: UsuarioService,
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

  criarForm() {
    this.form = this.fb.group({
      id: [''],
      nome: [''],
      email: [''],
      status: [''],
      token: [''],
      confirmacaoEmail: [''],
      sexo: [''],
      grupoId: [''],
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
        'MSG000007.descricao',
        'MSG000138.descricao',
        'MSG000150.descricao',
        'MSG000149.descricao',
        'MSG000156.descricao',
        'MSG000017.descricao',
        'MSG000065.descricao',
        'MSG000159.descricao',
        'MSG000160.descricao',
        'MSG000161.descricao',
        'MSG000162.descricao',
        'MSG000055.descricao',
        'MSG000175.descricao',
        'MSG000176.descricao',
        "MSG000003.descricao",
        "MSG000117.descricao",
        "MSG000204.descricao",
        "MSG000205.descricao",
        "MSG000206.descricao",
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
        this.router.navigate([`${UsuarioPesquisarComponent.ROTA}/novo`]);
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

    //recuperarSenha
    this.btnRecuperarSenha = <Button>{
      text: this.mensagens['MSG000007.descricao'],
      type: ButtonType.LIGHT_INFO,
      click: () => {
        this.recuperarSenha(this.gridService.gridDirective.itensSelecionados[0].email);
      },
      icon: 'fa fa-envelope-alt icon-sm',
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
      this.btnRecuperarSenha,
      this.btnExcluir,
      cadastrarBtn,
    ];
    this.subheader.title = this.mensagens['MSG000055.descricao'];
    this.subheader.text = this.mensagens['MSG000176.descricao'];
    this.subheader.label = this.label;

    this.subheaderService.create(this.subheader);
  }

  carregarComboStatus(){
    this.usuarioService.obterStatus().subscribe(
      resp => {
        resp.result.sort(this.utilService.dynamicSort('descricao')).forEach(data => {
          this.statusList.push({ id: data.valor, text: data.descricao });
        });
      },
      erro => {
        this.setError(erro);
      }
    );
  }

  carregarComboSexo(){
    this.usuarioService.obterSexo().subscribe(
      resp => {
        resp.result.sort(this.utilService.dynamicSort('descricao')).forEach(data => {
          this.sexoList.push({ id: data.valor, text: data.descricao });
        });
      },
      erro => {
        this.setError(erro);
      }
    );
  }

  carregarComboGrupo(){

    this.grupoService.obterGrupos().subscribe(
      (resp) => {
        resp.result.data.sort(this.utilService.dynamicSort('descricao')).forEach(data => {
          this.grupoList.push({ id: data.id, text: data.nome });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  carregarPagina() {

    this.editarGridBtn = <Button>{
      icon: 'flaticon2-edit icon-nm',
      type: ButtonType.LIGHT_PRIMARY,
      visible: true,
      title: this.mensagens['MSG000175.descricao'],
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: (obj: Usuario) =>
        this.router.navigate([
          `${UsuarioPesquisarComponent.ROTA}/${obj.id}`,
        ]),
    };

    this.excluirGridBtn = <Button>{
      icon: 'fa fa-trash icon-nm',
      type: ButtonType.LIGHT_DANGER,
      title: this.mensagens['MSG000138.descricao'],
      visible: true,
      permission: ['usuario.cadastrar', 'usuario.atualizar'],
      click: (obj: Usuario) => this.deletar([obj]),
    };

    this.carregarComboSexo();
    this.carregarComboStatus();
    this.carregarComboGrupo();

    var gridOption: GridOptions = <GridOptions>new Object();
    gridOption.apiServiceHttp = `${environment.apiUrl}/${UsuarioService.API_USUARIOS}${window.location.search}`;
    // gridOption.routeBase = 'admin/usuario';
    gridOption.orderBy = 'id';
    gridOption.orderType = 'desc';
    gridOption.columns = <GridColumn[]>[
      {
        field: 'id',
        label: this.mensagens['MSG000156.descricao'],
        sortable: true,
      },
      {
        field: 'nome',
        label: this.mensagens['MSG000017.descricao'],
        sortable: true,
      },
      {
        field: 'email',
        label: this.mensagens['MSG000003.descricao'],
        sortable: true,
      },
      {
        field: 'sexo',
        fakeField: 'sexoGrid',
        label: this.mensagens['MSG000117.descricao'],
        sortable: true,
      },
      // {
      //   field: 'grupo.grupoId',
      //   fakeField: 'grupoNome',
      //   label: this.mensagens['MSG000065.descricao'],
      //   sortable: true,
      // },
      {
        field: 'confirmacaoEmail',
        fakeField: 'confirmacaoEmailGrid',
        label: this.mensagens['MSG000206.descricao'],
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
        field: 'updated_at',
        label: this.mensagens['MSG000160.descricao'],
        align: 'center',
        sortable: true,
      },
      {
        field: 'created_at',
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

    gridOption.onSelectedItem = (itens: Usuario[]) => {

      this.btnExcluir.visible = itens.length > 0;
      this.btnRecuperarSenha.visible = itens.length == 1;
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

    gridOption.onBenforeData = (data: Usuario[]) => {
      var dados: UsuarioGrid[] = [];
      data.forEach(entity => {

        var dado:UsuarioGrid = <UsuarioGrid>entity;
          dado.statusGrid = this.utilService.createLabelStatus(entity.status);
          dado.sexoGrid = this.utilService.createLabelSexo(entity.sexo);
          dado.confirmacaoEmailGrid = this.utilService.createLabelSimNao(entity.confirmacaoEmail);

          if(entity.grupoId>0){
          this.grupoService.obterGrupoId(entity.grupoId).subscribe(resp=>{
            dado.grupoNome = resp.result.nome;
          })
        }

        dados.push(dado);
      });

      return dados;
    };

    this.grid = this.gridService;
    this.grid.create(gridOption);
    this.grid.search();
  }

  resetGrid(){
    this.btnRecuperarSenha.visible = false;
    this.btnAtivar.visible =false;
    this.btnInativar.visible =false;
    this.btnExcluir.visible = false;
    this.gridService.search();
  }

  ativar(itens: Usuario[]) {
        var status = itens[0].status == 0 ? 1 : 0;
    var requisisoes = [];
    itens.forEach((item) => {
      requisisoes.push(
        this.usuarioService.statusUsuario(item.id, status).pipe(catchError(erro => of(erro)))
      );
    });

    forkJoin(requisisoes).subscribe((x: RetornoPadrao<Usuario>[]) => {
            var resp = x[0];
      this.messageService.create(resp.message);
      this.resetGrid();
    });
  }

  recuperarSenha(email:string){
    this.authService
    .recuperarSenha(email)
    .subscribe(
      (resp) => {

        if(resp.message == 'MSG000047') resp.message = 'MSG000217';
        this.messageService.create(resp.message);
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  cancelar() {
    this.form.reset();
    this.filtrarGrid(this.gridService);
  }

  deletar(itens: Usuario[]) {
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
            this.usuarioService.deletarUsuario(item.id).pipe(catchError(erro => of(erro)))
          );
        });

        forkJoin(requisisoes).subscribe((resp: RetornoPadrao<Usuario>[]) => {
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
