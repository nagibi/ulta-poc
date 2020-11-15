import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit{
  
  public static ROTA:string = 'admin';

  constructor(
    private layoutService: LayoutService,
    private router:Router
    ){
    
    
  }
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd") {
        console.log('ngAfterViewInit: NavigationEnd')
        // this.layoutService.setUserProfile(false);
        document.getElementById('kt_quick_user').classList.remove('offcanvas-on');
        document.getElementById('kt_quick_user').classList.remove('offcanvas-on');
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd") {
        console.log('ngOnInit: NavigationEnd')
        // this.layoutService.setUserProfile(false);
      }
    });
    this.router.events.subscribe(event => {
      console.log('name:' + event.constructor.name)

      // this.layoutService.setUserProfile(false);
    });
    
  }

}
