import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public static ROTA: string = 'auth';

  public isRegistrar: boolean = false;
  constructor() {
  }
  ngOnInit() {}
}
