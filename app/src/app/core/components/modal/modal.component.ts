
import { Component, Input, OnInit, Output } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public modal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    // console.log(this.modal);
  }

  passBack(action) {
    this.passEntry.emit(action);
    this.activeModal.close();
  }


}

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css']
// })
// export class ModalComponent implements OnInit {
  
//   subscription:Subscription;
//   modalOptions:NgbModalOptions;
//   closeResult: string;

//   constructor(
//     private modalService:ModalService,
//     public ngbActiveModal: NgbActiveModal,
//     public ngbModal: NgbModal) {
//       this.modalOptions = {
//         backdrop:'static',
//         backdropClass:'customBackdrop'
//       }
//      }

//   ngOnInit() {
//     this.subscription = this.modalService.getModal().subscribe(modal=>{
//       this.ngbActiveModal.open(ModalComponent, this.modalOptions).result.then((result) => {
//         debugger
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       debugger
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//     });
//   }

  
//   private getDismissReason(reason: any): string {
//     debugger
//     return ""
//     // if (reason === ModalDismissReasons.ESC) {
//     //   return 'by pressing ESC';
//     // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     //   return 'by clicking on a backdrop';
//     // } else {
//     //   return  `with: ${reason}`;
//     // }
//   }

// }
