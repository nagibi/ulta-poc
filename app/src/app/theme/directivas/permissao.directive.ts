import { Directive, Input, OnInit,ViewContainerRef, TemplateRef, ElementRef } from '@angular/core';
import { __importDefault } from 'tslib';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Directive({
  selector: '[permissao]',
})
export class PermissaoDirective implements OnInit {

  @Input("permissao") permissao:any[];

  constructor(
    private elementRef: ElementRef, 
    private authService: AuthService) {

  }

  ngOnInit() {
    if(!this.authService.usuarioTemPermissao(this.permissao)){
      this.elementRef.nativeElement.remove();
    }
  }
}
