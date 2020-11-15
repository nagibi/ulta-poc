import { Injectable } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private subject = new Subject<any>();

  constructor(private modalService: NgbModal) {}

  getModal(): Observable<any> {
    return this.subject.asObservable();
  }

  open() {
    this.subject.next({});
  }
}
