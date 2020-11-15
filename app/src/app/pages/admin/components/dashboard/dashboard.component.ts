import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBaseComponent } from 'src/app/core/components/form-base/form-base.component';
import { UsuarioService } from 'src/app/pages/auth/services/usuario.service';
import { ArquivoService } from 'src/app/core/services/arquivo.service';
import { TemplateEmailService } from '../../services/template-email.service';
import { GrupoService } from '../../services/grupo.service';
import { BairroService } from '../../services/bairro.service';
import { SubheaderService } from 'src/app/theme/services/subheader.service';
import { DocumentoService } from '../../services/documento.service';
import { FaturamentoService } from '../../services/faturamento.service';
import { DemonstrativoFaturamentoService } from '../../services/demonstrativo-faturamento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends FormBaseComponent
  implements OnInit {

  public totalGrupos: number = 0;
  public totalUsuario: number = 0;
  public totalDocumentos: number = 0;
  public totalDemonstrativos: number = 0;
  public totalFaturamentos: number = 0;
  public totalDemonstrativoFaturamentos: number = 0;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected subheaderService: SubheaderService,
    protected usuarioService: UsuarioService,
    protected grupoService: GrupoService,
    protected faturamentoService: FaturamentoService,
    protected demonstrativoFaturamentoService: DemonstrativoFaturamentoService,
    protected documentoService: DocumentoService,
  ) {
    super(fb, router, translateService, messageService, modalService);
  }

  ngOnInit() {

    this.subheader.label = this.label;
    this.subheaderService.create(this.subheader);

    this.carregarPagina();

  }

  private carregarPagina() {

    if (this.authService.usuarioTemPermissao(['usuario-obter'])) {
      this.usuarioService.obterTotalUsuarios().subscribe(resp => {
        this.totalUsuario = resp.result;
      });
    }

    if (this.authService.usuarioTemPermissao(['grupo-obter'])) {
      this.grupoService.obterTotalGrupos().subscribe(resp => {
        this.totalGrupos = resp.result;
      });
    }

    if (this.authService.usuarioTemPermissao(['usuario-obter'])) {
      this.documentoService.obterTotalDocumentos().subscribe(resp => {
        this.totalDocumentos = resp.result;
      });
    }

    if (this.authService.usuarioTemPermissao(['faturamento-obter'])) {
      this.faturamentoService.obterTotalFaturamentos().subscribe(resp => {
        this.totalFaturamentos = resp.result;
      });
    }

    if (this.authService.usuarioTemPermissao(['demonstrativo-faturamento-obter'])) {
      this.demonstrativoFaturamentoService.obterTotalDemonstrativoFaturamentos().subscribe(resp => {
        this.totalDemonstrativoFaturamentos = resp.result;
      });
    }

  }


}
