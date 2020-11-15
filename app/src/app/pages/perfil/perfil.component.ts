import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Usuario, UsuarioAutenticado } from '../auth/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public static ROTA: string = 'perfil';


  constructor(private authService:AuthService) {}

  ngOnInit() {
  }

  get getUsuarioLogado():UsuarioAutenticado{
    return this.authService.usuarioLogadoValue;
  }
}
