import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Usuario, UsuarioAutenticado } from 'src/app/pages/auth/models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/components/login/login.component';
import { FormBaseComponent } from '../form-base/form-base.component';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent extends FormBaseComponent implements OnInit  {

  offcanvas:boolean=false;

  constructor(
    public layoutService: LayoutService,
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal
  ) {
    super(fb,router, translateService, messageService, modalService);
    // 
  }
  
  // enviarViaService() {
  //   this.layoutService.setUserProfile(true);
  // }

  // get getUserProfile(): boolean {
  //   return this.layoutService.getUserProfile().value;
  // }

  get getUsuarioLogado():UsuarioAutenticado{
    return this.authService.usuarioLogadoValue;
  }

  ngOnInit() {
    // this.onUserCloseClick();
    }

  // onUserCloseClick(){
    
  //   this.layoutService.setUserProfile(false);
  // }
  
  logout(){
    this.authService.logout();
    // this.onUserCloseClick();
    this.router.navigate([LoginComponent.ROTA]);
  }


}
