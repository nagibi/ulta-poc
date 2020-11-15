import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast } from '../../models/toast.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  subscription:Subscription;
  toasts:Toast[] = [];

  constructor(private toastService:ToastService) { }
  
  ngOnInit() {
    
    this.subscription = this.toastService.getToast().subscribe(toast=>{
      var isExiste = this.toasts.findIndex(x=>x.text == toast.text && x.title == toast.title && x.type == toast.type);
      if(isExiste==-1){
      this.toasts.push(toast);

      if(toast.timeClose && toast.timeClose > 0){
        setTimeout(()=> this.onRemoveToast(toast),toast.timeClose);
      }
    }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRemoveToast(toast:Toast){
    this.toasts = this.toasts.filter(x=>x != toast);
  }

}
