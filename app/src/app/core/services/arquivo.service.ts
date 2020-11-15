import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/core/services/base.api.service';
import { Arquivo } from '../models/arquivo.model';
import { Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService extends BaseApiService {
  
  public static API_ARQUIVO: string = 'api/v1/arquivos';
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(protected http: HttpClient) {
    
    super(http);
  }

  // upload(arquivos:any[]){
  //   debugger
  //   if (arquivos.length === 0) {
  //     return;
  //   }
 
  //   let fileToUpload = <File>arquivos[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
 
  //   this.http.post(`${environment.apiUrl}/${ArquivoService.API_ARQUIVO_UPLOAD}`, formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // }

  adicionar(arquivos:any[]): Observable<RetornoPadrao<Arquivo[]>> {
  
    if (arquivos.length === 0) {
      return;
    }
   
    let filesToUpload : File[] = arquivos;
    const formData = new FormData();
      
    // Array.from(filesToUpload).map((file, index) => {
    //   return formData.append('file'+index, file, file.name);
    // });

    var file = filesToUpload[0];
    formData.append('file', file, file.name);
    return this.http
      .post<RetornoPadrao<Arquivo[]>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`,
        formData
        // { headers: this.httpHeaders }
      )
      .pipe(
        
        map(res => {
          return res;
        })
      );
   
  //   this.http.post(`${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`, formData, {reportProgress: true, observe: 'events'})
  // .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  }

  adicionarArquivo(
    arquivo: Arquivo
  ): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .post<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`,
        arquivo,
        { headers: this.httpHeaders }
      )
      .pipe(
        
        map(res => {
          return res;
        })
      );
  }

  deletarArquivo(id: number): Observable<RetornoPadrao<any>> {
    return this.http
      .delete<RetornoPadrao<any>>(`${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/${id}`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  obterArquivos(): Observable<RetornoPadrao<Arquivo[]>> {
    return this.http
      .get<RetornoPadrao<Arquivo[]>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}`
      )
      .pipe(
        
        map(res => {
          return res;
        })
      );
  }

  obterArquivoId(id: number): Observable<RetornoPadrao<Arquivo>> {
    return this.http
      .get<RetornoPadrao<Arquivo>>(
        `${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/${id}`
      )
      .pipe(
        
        map(res => {
          return res;
        })
      );
  }

  obterTotalArquivos(): Observable<RetornoPadrao<number>> {
    return this.http
      .get<RetornoPadrao<number>>(`${environment.apiUrl}/${ArquivoService.API_ARQUIVO}/total`)
      .pipe(
        
        map((res: any) => {
          return res;
        })
      );
  }



}
