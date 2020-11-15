import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toast, ToastType } from '../models/toast.model';
import { faThumbsUp, faInfoCircle, faCheck,faThumbsDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private subject = new Subject<Toast>();
  private keepAfterRouteChange = false;

  constructor(
    private router: Router,
    private translateService:TranslateService) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterRouteChange) {
    //       this.keepAfterRouteChange = false;
    //     } else {
    //       this.clear();
    //     }
    //   }
    // });
  }

  getToast(): Observable<Toast> {
    return this.subject.asObservable();
  }

  primary(message: string, timeClose: number) {
    this.keepAfterRouteChange = this.keepAfterRouteChange;
    this.subject.next({
      type: ToastType.PRIMARY,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
      
    });
  }

  secondary(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.PRIMARY,
      text: message,
      icon: faCheck,
      timeClose: timeClose,
      

    });
  }

  success(message: string, timeClose: number) {
    
    this.subject.next({
      type: ToastType.SUCCESS,
      text: message,
      icon: faThumbsUp,
      timeClose: timeClose,
      

    });
  }

  danger(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.ERROR,
      text: message,
      icon: faThumbsDown,
      timeClose: timeClose,
      

    });
  }

  warning(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.WARNING,
      text: message,
      icon: faExclamationTriangle,
      timeClose: timeClose,
      

    });
  }

  info(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.INFO,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
      

    });
  }

  light(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.LIGHT,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
      

    });
  }

  dark(message: string, timeClose: number) {
    this.subject.next({
      type: ToastType.DARK,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
      

    });
  }

  clear() {
    this.subject.next();
  }
}
