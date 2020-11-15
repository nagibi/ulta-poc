import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Erro } from '../../models/erro.model';
import { UtilService } from '../../services/util.service';
import { UsuarioService } from 'src/app/pages/auth/services/usuario.service';
import { Subheader } from 'src/app/theme/models/subheader-item.model';
import { GridService } from 'src/app/theme/services/grid.service';
import { Label } from 'src/app/theme/models/label.model';

@Component({
  selector: 'app-form',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.css'],
})
export class FormBaseComponent implements OnInit {
  public msgsError: any;
  public form: FormGroup;
  public mensagens: any;
  protected label: Label;
  protected modalOptions: NgbModalOptions;

  public id: number;
  protected subheader: Subheader;
  @Input() model:any;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected translateService: TranslateService,
    protected messageService: MessageService,
    protected modalService: NgbModal,
    protected utilService?: UtilService,
    protected usuarioService?: UsuarioService
  ) {
    
    this.label = new Label();
    this.label.visible =false;
    this.subheader = new Subheader();
    this.msgsError = [];
  }

  ngOnInit() {
    
    var usuarioCriacaoId = this.model['usuarioAtualizacaoId'];
    if(usuarioCriacaoId!=null){
      this.usuarioService.obterUsuarioNome(usuarioCriacaoId).subscribe(resp=>{
        this.model['usuarioCriacao'] =  resp.result;
      })
    }

    var usuarioAtualizacaoId = this.model['usuarioAtualizacaoId'];
    if(usuarioAtualizacaoId!=null){
      this.usuarioService.obterUsuarioNome(usuarioAtualizacaoId).subscribe(resp=>{
        this.model['usuarioAtualizacao'] =  resp.result;
      })
    }
  }

  filtrarGrid(grid:GridService, formGroup?:FormGroup){
    
    var queryParams=[];
    var queryString='';

    if(formGroup==null)
      formGroup = this.form;

     console.log('inicio')
     var i = 0;
     Object.keys(formGroup.controls).forEach(key => {
      var value = formGroup.value[key];
       if(value != null){
          queryParams.push(`${key}=${value}`);

       }
       i++;
       console.log(i)
    });
    console.log('fim')
    
    
    console.log('inicio')
    i = 0;
    for (var [key, item] of queryParams.entries()) { 
      if(key===0)
        queryString += `?${item}`;
      else
        queryString += `&${item}`;
        console.log(i)
    }
    console.log('fim')

    var apiServiceHttpQueryString = grid.gridOptions.apiServiceHttp.split('?');
    if(apiServiceHttpQueryString.length>1)
      grid.gridOptions.apiServiceHttp = apiServiceHttpQueryString[0];

    if(queryString!=''){
      grid.gridOptions.apiServiceHttp += `${queryString}`;
    }

    // if(queryString!=''){
    //   grid.gridOptions.apiServiceHttp = `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}${queryString}`;
    // }else{
    //   grid.gridOptions.apiServiceHttp = `${environment.apiUrl}/${TemplateEmailService.API_TEMPLATE_EMAIL}`;
    // }
    grid.search();
  }

  validar(): boolean {
    var controls = this.form.controls;

    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
      });

      this.messageService.create('MSG000110');

      return false;
    } else {
      return true;
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  setControlInvalid(controlName: string, message: string) {
    this.translateService.get(message).subscribe((message) => {
      var field = this.form.controls[controlName];
      var message = message.descricao;

      field.setErrors({ error: message });
      this.msgsError[controlName] = message;
      field.markAsTouched();
    });
  }

  setError(erro: Erro) {
    if (erro.message) {
      let codeErro = erro.message;

      if (codeErro == 'MSG000071') codeErro = 'MSG000034';

      this.messageService.create(codeErro);

      for (let value of erro.errors) {
        var field = this.toTitle(value.field);
        this.setControlInvalid(field, value.message);
      }
    }
  }

  toTitle(string: string, separator = ' ') {
    return string
      .split(separator)
      .map((word) => word[0].toLowerCase() + word.slice(1))
      .join(separator);
  }

  // carregarFormPadrao(model:any){
  //   debugger
  //   this.teste = 'bbbbbbbbbbbb';
  //   // this.model = {};
  //   // this.model['dataCriacao'] = model['dataCriacao']; 
  //   // this.model['dataAtualizacao'] = model['dataAtualizacao']; 

  // }
}
