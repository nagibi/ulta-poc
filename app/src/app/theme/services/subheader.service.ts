import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Subheader } from '../models/subheader-item.model';

@Injectable({
  providedIn: 'root',
})
export class SubheaderService {
  
  private subject = new Subject<Subheader>();
  private tituloSubject = new Subject<any>();
  private descricaoSubject = new Subject<any>();

  constructor() {}
  
  getSubheader(): Observable<Subheader> {
    return this.subject.asObservable();
  }

  getTitle(): Observable<any> {
    return this.tituloSubject.asObservable();
  }

  getText(): Observable<any> {
    return this.descricaoSubject.asObservable();
  }
  
  create(subheader:Subheader) {
    this.subject.next(subheader);
  }

  set title(title:any){
    this.tituloSubject.next(title);
  }

  set text(text:any){
    this.descricaoSubject.next(text);
  }
}
