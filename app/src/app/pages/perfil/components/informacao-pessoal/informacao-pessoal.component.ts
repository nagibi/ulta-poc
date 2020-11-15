import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil.model';
import { UtilService } from 'src/app/core/services/util.service';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { Enum } from 'src/app/core/models/enum.model';
import { ImageCropComponent } from 'src/app/core/components/image-crop/image-crop.component';
import { UsuarioAutenticado } from 'src/app/pages/auth/models/usuario.model';
import { Arquivo } from 'src/app/core/models/arquivo.model';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { Subheader } from 'src/app/theme/models/subheader-item.model';

@Component({
  selector: 'app-informacao-pessoal',
  templateUrl: './informacao-pessoal.component.html',
  styleUrls: ['./informacao-pessoal.component.css'],
})
export class InformacaoPessoalComponent extends FormBaseComponent
  implements OnInit {
  public static ROTA: string = '/admin/perfil/informacao-pessoal';
  public dataNascimento: any;
  sexoList: any[] = [];
  modalOptions: NgbModalOptions;
  avatar: Arquivo;
  public modal = {
    title: '<i class="la la-photo icon-lg"></i> Alterar Avatar',
  };

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
    this.avatar = new Arquivo();

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
    };

    this.msgsError = [];

    this.translateService
      .get([
        'MSG000092.descricao',
        'MSG000113.descricao',
        'MSG000119.descricao',
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;

        this.avatar.id = this.getUsuarioLogado.arquivoId;
        this.avatar.caminho = this.getUsuarioLogado.arquivoCaminho;

        this.criarForm();
        this.criarSubheader();
        this.carregarPagina();
      });
  }

  get getUsuarioLogado(): UsuarioAutenticado {
    return this.authService.usuarioLogadoValue;
  }

  onCropImageClick() {
    const modalRef = this.modalService.open(
      ImageCropComponent,
      this.modalOptions
    );
    modalRef.componentInstance.modal = this.modal;
    modalRef.result.then(
      (result: RetornoPadrao<Arquivo[]>) => {
        var arquivo = result.result[0];
        this.avatar.id = arquivo.id;
        this.avatar.caminho = arquivo.caminho;

        this.salvar();

        // var usuarioLogado = this.authService.usuarioLogadoValue;
        // usuarioLogado.arquivoId = result[0].id;
        // usuarioLogado.arquivoCaminho = result[0].caminho;

        // this.authService.setUsuarioLogado(usuarioLogado);
      },
      () => {}
    );
  }

  criarForm() {
    this.form = this.fb.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
    });
  }

  carregarPagina() {
    this.sexoList = [];

    this.perfilService.obterSexo().subscribe(
      (resp) => {
        resp.result.forEach((data: Enum) => {
          this.sexoList.push({ id: data.valor, text: data.descricao });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );

    this.perfilService.obterPerfil().subscribe(
      (resp) => {
        this.messageService.create(resp.message);
        resp.result.dataNascimento = this.utilService.getDateObject(
          resp.result.dataNascimento
        );
        this.form.patchValue(resp.result);
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  addressSearchChanged(searchText: string) {
    if (searchText.length >= 3) {
    }
  }

  criarSubheader() {
    var btnSalvar = <Button>{
      text: this.mensagens['MSG000092.descricao'],
      type: ButtonType.LIGHT_SUCCESS,
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

    // var buttons:Button[] = [];
    // var btnVoltar = new Button('Voltar',ButtonType.PRIMARY,null, ()=>{ debugger })
    // var btnSalvar = new Button('Salvar', ButtonType.PRIMARY,null,()=>{debugger},'flaticon2-writing');
    // btnVoltar.actions.push(btnSalvar);
    // var btnSalvarNovo = new Button('Salvar Novo', ButtonType.PRIMARY,null,()=>{debugger},'flaticon2-writing');
    // btnVoltar.actions.push(btnSalvarNovo);

    // buttons.push(btnVoltar)

    // var subheader:Subheader = new Subheader('Edit Usuário',' 1 - Nagibi Emanuel Cunha da Silva',buttons);
    // this.subheaderService.create(subheader);
  }

  salvar() {
    if (this.validar()) {
      const dadosForm = this.form.value;

      let model = new Perfil(
        dadosForm.nome,
        dadosForm.email,
        this.utilService.getDateString(dadosForm.dataNascimento),
        dadosForm.sexo
      );
      model.arquivoId = this.avatar.id;

      this.perfilService.atualizarPerfil(model).subscribe(
        (resp) => {
          if (resp.message === 'MSG000111') {
            var usuarioAtualizado = resp.result;
            var usuarioLogado = this.authService.usuarioLogadoValue;
            usuarioLogado.nome = usuarioAtualizado.nome;
            usuarioLogado.email = usuarioAtualizado.email;
            usuarioLogado.arquivoId = this.avatar.id;
            usuarioLogado.arquivoCaminho = this.avatar.caminho;

            this.authService.setUsuarioLogado(usuarioLogado);
          }

          this.messageService.create(resp.message);
        },
        (erro) => {
          this.setError(erro);
        }
      );
    }
  }
}
