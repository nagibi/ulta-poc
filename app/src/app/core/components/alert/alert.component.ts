import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';
import { Alert } from '../../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('alert') alert: ElementRef;

  subscription: Subscription;
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngAfterViewInit(): void {
    // this.alert.nativeElement.remove();
  }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((alert) => {
      
      var isExiste = this.alerts.findIndex(x=>x.text == alert.text && x.type == alert.type);
      if(isExiste==-1){
        this.alerts.push(alert);

        if (alert.timeClose && alert.timeClose > 0) {
                  
          setTimeout(() => this.onRemoveAlert(alert), alert.timeClose);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRemoveAlert(alert: Alert) {
    this.alerts = this.alerts.filter((x) => x != alert);
  }
}
