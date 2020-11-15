import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
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
import { Endereco, Mapa } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { EnderecoPesquisarComponent } from '../endereco-pesquisar/endereco-pesquisar.component';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { LocalidadeService } from 'src/app/core/services/localidade.service';
import { MouseEvent } from '@agm/core/services/google-maps-types';
import { BairroService } from 'src/app/pages/admin/services/bairro.service';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  marker?: Marker;
}

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent extends FormBaseComponent implements OnInit {
  geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    zoom: 15,
  };

  @ViewChild(AgmMap) map: AgmMap;
  public markers: Marker[] = [];

  public registroAtual: Endereco;
  private btnAtivar: Button;
  private btnInativar: Button;
  private btnExcluir: Button;
  private btnSalvar: Button;
  private usuarioId: number;
  public tipoList: any[] = [];
  public onApiCepComplete: boolean = false;
  public cidadeList: any[] = [];
  public ufList: any[] = [];

  constructor(
    protected httpClient: HttpClient,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected enderecoService: EnderecoService,
    protected utilService: UtilService,
    protected subheaderService: SubheaderService,
    public gridService: GridService,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private localidadeService: LocalidadeService,
    private bairroService: BairroService
  ) {
    super(fb, router, translateService, messageService, modalService);

    this.usuarioId = this.authService.usuarioLogadoValue.id;

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }
  ngOnInit() {
    // this.location.marker.draggable = true;

    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.location = {
    //     lat: -20.1846627 ,
    //     lng: -40.2274067,
    //     // marker: {
    //     //   lat: position.coords.latitude,
    //     //   lng: position.coords.longitude,
    //     //   draggable: true
    //     // },
    //     zoom: 15,
    //   };
    // });

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

  carregarComboMunicipios(id: number = 0) {
    this.cidadeList = [];
    var ufId = this.form.controls['ufId'].value;
    var municipioId = this.form.controls['municipioId'];

    this.localidadeService.obterMunicipios(ufId).subscribe(
      (resp) => {
        resp.result
          .sort(this.utilService.dynamicSort('nome'))
          .forEach((data) => {
            this.cidadeList.push({ id: data.id, text: data.nome });
          });

        if (id > 0) {
          municipioId.setValue(id);
        }
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  carregarComboUfs() {
    this.localidadeService.obterEstados().subscribe(
      (resp) => {
        resp.result
          .sort(this.utilService.dynamicSort('nome'))
          .forEach((data) => {
            this.ufList.push({ id: data.id, text: data.nome });
          });
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  criarForm() {
    this.form = this.fb.group({
      titulo: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      numero: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      complemento: [''],
      // tipo: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      municipioId: ['', [Validators.required]],
      ufId: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      dataCriacao: [''],
      dataAtualizacao: [''],
      usuarioCriacaoId: [''],
      usuarioAtualizacaoId: [''],
    });
  }

  carregarComboTipos() {
    this.enderecoService.obterTipoEnderecos().subscribe(
      (resp) => {
        resp.result.forEach((data) => {
          this.tipoList.push({ id: data.valor, text: data.descricao });
        });
      },
      (erro) => {
        this.setError(erro);
      }
    );
  }

  carregarPagina() {
    this.carregarComboTipos();
    this.carregarComboUfs();

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
        this.router.navigate([`${EnderecoPesquisarComponent.ROTA}`]);
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
      this.enderecoService.obterEnderecoId(this.usuarioId, this.id).subscribe(
        (resp) => {
          this.registroAtual = resp.result;

          this.atualizarStatus();

          this.btnExcluir.visible = true;

          this.subheaderService.title = this.mensagens['MSG000098.descricao'];
          this.subheaderService.text = `${this.registroAtual.id} - ${this.registroAtual.titulo}`;

          this.bairroService
            .obterBairroId(this.registroAtual.bairroId)
            .subscribe((resp) => {
              this.form.controls['bairro'].setValue(resp.result.nome);
              this.form.controls['ufId'].setValue(resp.result.ufId);
              this.form.controls['municipioId'].setValue(
                resp.result.municipioId
              );

              this.carregarComboMunicipios();

              this.location.lat = Number(this.registroAtual.lat);
              this.location.lng = Number(this.registroAtual.lng);

              this.markers = [];
              this.markers.push({
                lat: this.registroAtual.lat,
                lng: this.registroAtual.lng,
                label: 'A',
                draggable: true,
              });
            });

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
    this.enderecoService
      .statusEndereco(this.usuarioId, this.id, template.status)
      .subscribe(
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

      let model = new Endereco();

      if (this.id > 0) {
        model.id = this.id;
      }

      model.municipioId = dadosForm.municipioId;
      model.numero = dadosForm.numero;
      model.ufId = dadosForm.ufId;
      model.titulo = dadosForm.titulo;
      model.cep = dadosForm.cep;
      model.logradouro = dadosForm.logradouro;
      model.complemento = dadosForm.complemento;
      // model.tipo = dadosForm.tipo;
      model.usuarioId = this.usuarioId;
      model.bairro = dadosForm.bairro;
      model.lng = this.location.lng;
      model.lat = this.location.lat;
      // model.mapa = new Mapa();
      // model.mapa.lat = this.location.lat;
      // model.mapa.lng = this.location.lng;
      model.usuarioCriacaoId = dadosForm.usuarioCriacaoId;
      model.usuarioAtualizacaoId = dadosForm.usuarioAtualizacaoId;
      model.dataCriacao = dadosForm.dataCriacao;
      model.dataAtualizacao = dadosForm.dataAtualizacao;

      this.enderecoService.salvarEndereco(model).subscribe(
        (resp) => {
          this.messageService.create(resp.message);
          if (resp.message === 'MSG000111' || resp.message === 'MSG000151') {
            if (isNovo) {
              this.cancelar();
              this.router.navigate([`${EnderecoPesquisarComponent.ROTA}/novo`]);
            } else if (this.id != resp.result.id) {
              this.router.navigate([
                `${EnderecoPesquisarComponent.ROTA}/${resp.result.id}`,
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
        this.enderecoService.deletarEndereco(this.usuarioId, this.id).subscribe(
          (resp) => {
            this.messageService.create(resp.message);
            if (resp.message === 'MSG000144') {
              this.router.navigate([`${EnderecoPesquisarComponent.ROTA}/novo`]);
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

  markerDragEnd(m: Marker, $event: any) {
    this.localidadeService
      .obterCepLatLgn($event.coords.lat, $event.coords.lng)
      .subscribe((resp) => {
        this.onApiCepComplete = true;

        var logradouro = this.form.controls['logradouro'];
        var uf = this.form.controls['ufId'];
        var bairro = this.form.controls['bairro'];
        // var lat = this.form.controls['lat'];
        // var lng = this.form.controls['lng'];

        this.localidadeService
          .obterMunicipioId(resp.result.cidade.ibge)
          .subscribe((respLocalidade) => {
            uf.setValue(respLocalidade.result.microrregiao.mesorregiao.UF.id);
            this.carregarComboMunicipios(respLocalidade.result.id);
          });

        logradouro.setValue(resp.result.logradouro);
        bairro.setValue(resp.result.bairro);

         this.location.lat = Number(resp.result.latitude);
         this.location.lng = Number(resp.result.longitude);

        this.markers = [];
        this.markers.push({
          lat: this.location.lat,
          lng: this.location.lng,
          label: 'A',
          draggable: true,
        });
      });
  }

  buscarCep() {
    var cep = this.form.controls['cep'];
    if (cep.invalid) {
    } else {
      this.localidadeService.obterCep(cep.value).subscribe((resp) => {

        if(resp.result.cep == null){
          this.messageService.create('MSG000255');
          this.form.controls['cep'].reset();
        }else{

          var logradouro = this.form.controls['logradouro'];
          var uf = this.form.controls['ufId'];
          var bairro = this.form.controls['bairro'];

          this.localidadeService
            .obterMunicipioId(resp.result.cidade.ibge)
            .subscribe((respLocalidade) => {
              uf.setValue(respLocalidade.result.microrregiao.mesorregiao.UF.id);
              this.carregarComboMunicipios(respLocalidade.result.id);
            });

          logradouro.setValue(resp.result.logradouro);
          bairro.setValue(resp.result.bairro);

          this.location.lat = resp.result.latitude;
          this.location.lng = resp.result.longitude;

          this.markers = [];
          this.markers.push({
            lat: this.location.lat,
            lng: this.location.lng,
            label: 'A',
            draggable: true,
          });
        }

      });
    }
  }

  clickedMarker() {}

  // findAddressByCoordinates() {
  //   this.geocoder.geocode({
  //     'location': {
  //       lat: this.location.lat,
  //       lng: this.location.lng
  //     }
  //   }, (results, status) => {
  //     debugger
  //     // this.decomposeAddressComponents(results);
  //   })
  // }

  // updateOnMap(){
  //   let full_address:string = this.location.address_level_1 || ""
  //     // if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
  //     // if (this.location.address_state) full_address = full_address + " " + this.location.address_state
  //     // if (this.location.address_country) full_address = full_address + " " + this.location.address_country
  //     full_address = 'rua nova friburgo 29166330'
  //     this.findLocation(full_address);
  // }

  // findLocation(address) {
  //   if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
  //   this.geocoder.geocode({
  //     'address': address
  //   }, (results, status) => {
  //     debugger
  //     console.log(results);
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       for (var i = 0; i < results[0].address_components.length; i++) {
  //         let types = results[0].address_components[i].types

  //         if (types.indexOf('locality') != -1) {
  //           this.location.address_level_2 = results[0].address_components[i].long_name
  //         }
  //         if (types.indexOf('country') != -1) {
  //           this.location.address_country = results[0].address_components[i].long_name
  //         }
  //         if (types.indexOf('postal_code') != -1) {
  //           this.location.address_zip = results[0].address_components[i].long_name
  //         }
  //         if (types.indexOf('administrative_area_level_1') != -1) {
  //           this.location.address_state = results[0].address_components[i].long_name
  //         }
  //       }

  //       if (results[0].geometry.location) {
  //         this.location.lat = results[0].geometry.location.lat();
  //         this.location.lng = results[0].geometry.location.lng();
  //         this.location.marker.lat = results[0].geometry.location.lat();
  //         this.location.marker.lng = results[0].geometry.location.lng();
  //         this.location.marker.draggable = true;
  //         this.location.viewport = results[0].geometry.viewport;
  //       }

  //       this.map.triggerResize()
  //     } else {
  //       alert("Sorry, this search produced no results.");
  //     }
  //   })
  // }
}
