import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private userProfileBehaviorSubject = new BehaviorSubject<boolean>(false);

constructor() {
 }

// setUserProfile(valor: boolean) {
//   console.log('setUserProfile:'+ valor)
//   this.userProfileBehaviorSubject.next(valor);
// }

// getUserProfile() {
//   return this.userProfileBehaviorSubject;
// }

}


