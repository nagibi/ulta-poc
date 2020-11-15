import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Usuario, UsuarioAutenticado } from 'src/app/pages/auth/models/usuario.model';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuarioLogado: Usuario;
  
  constructor(
    public layoutService: LayoutService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {}

  get getUsuarioLogado(): UsuarioAutenticado {
    return this.authService.usuarioLogadoValue;
  }

  // onUserTogleClick() {
  //   this.layoutService.setUserProfile(true);
  // }

  
}
