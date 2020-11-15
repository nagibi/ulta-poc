import { Component, OnInit, Input, Output } from '@angular/core';
import {
  NgbModalOptions,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBaseComponent } from '../form-base/form-base.component';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { EventEmitter } from '@angular/core';
import {
  ImageCroppedEvent,
  ImageTransform,
  Dimensions,
  base64ToFile,
} from 'ngx-image-cropper';
import { ArquivoService } from '../../services/arquivo.service';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css'],
})
export class ImageCropComponent extends FormBaseComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagename: File;
  image: File;
  imagesList: any[] = [];

  @Input() public modal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected authService: AuthService,
    protected router: Router,
    protected activeRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private arquivoService:ArquivoService

  ) {
    super(fb, router, translateService, messageService, modalService);
  }

  ngOnInit() {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagename = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const imageBlob = this.dataURItoBlob(this.croppedImage);
    this.image = new File([imageBlob], this.imagename.name, {
      type: 'image/jpeg',
    });
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png',
    });
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  onRecortar(action: boolean) {
    
    this.arquivoService.adicionar([this.image]).subscribe(resp=>{
      this.passEntry.emit(resp);
      this.activeModal.close(resp);
    });
  }

  
}
