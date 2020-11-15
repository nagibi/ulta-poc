import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';
import { faThumbsUp, faInfoCircle, faCheck,faThumbsDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<Alert>();
 // private keepAfterRouteChange = false;

  constructor() {
    
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

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  primary(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.PRIMARY,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
    });
  }

  secondary(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.PRIMARY,
      text: message,
      icon: faCheck,
      timeClose: timeClose,
    });
  }

  success(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.SUCCESS,
      text: message,
      icon: faThumbsUp,
      timeClose: timeClose,
    });
  }

  danger(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.DANGER,
      text: message,
      icon: faThumbsDown,
      timeClose: timeClose,
    });
  }

  warning(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.WARNING,
      text: message,
      icon: faExclamationTriangle,
      timeClose: timeClose,
    });
  }

  info(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.INFO,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
    });
  }

  light(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.LIGHT,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
    });
  }

  dark(message: string, timeClose: number) {
    this.subject.next({
      type: AlertType.DARK,
      text: message,
      icon: faInfoCircle,
      timeClose: timeClose,
    });
  }

  clear() {
    this.subject.next();
  }
}
