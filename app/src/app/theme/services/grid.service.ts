import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridComponent } from '../components/grid/grid.component';
import { GridOptions } from '../models/grid/grid-options.model';
import { GridParamns } from '../models/grid/grid-paramns';
import { RetornoPadrao } from 'src/app/core/models/retorno-padrao.model';
import { Grid } from '../models/grid/grid.model';

@Injectable({
  providedIn: 'root',
})
export class GridService implements Grid {
  public model: any;
  public gridDirective: GridComponent;
  public data: any;
  public gridOptions: GridOptions;
  public gridParamns: GridParamns;
  public qtdRegistros: number;
  public pageCurrent: number;
  public pageTotal: number;
  public total: number;
  public orderBy: string;
  public orderType: any;
  public isSearchComplete: boolean=false;

  constructor(private http: HttpClient) {
    this.gridParamns = new GridParamns();
  }

  create(gridOptions: GridOptions) {
    
    this.gridOptions = gridOptions;
    this.orderBy = gridOptions.orderBy;
    this.orderType = gridOptions.orderType;
    this.qtdRegistros = gridOptions.qtdRegistros != null ? gridOptions.qtdRegistros : gridOptions.isPaginate == false ? -1 : 10;
    this.pageCurrent = 0;
  }

  public qtdRegistrosChange(value: any): void {
    this.qtdRegistros = value;
    this.pageCurrent = 0;
    this.search();
  }

  public pageNextChange(): void {
    this.pageCurrent++;
    this.search();
  }

  public pagePrevChange(): void {
    this.pageCurrent--;
    this.search();
  }

  public order(value: any): void {
    value.sortableStr = value.sortableStr == 'desc' ? 'asc' : 'desc';
    var itens: any[] = this.gridOptions.columns.filter((item) => {
      return item != value;
    });

    itens.forEach((value) => {
      value.sortableStr = null;
    });

    this.orderBy = value.field;
    this.orderType = value.sortableStr;
    this.search();
  }

  //Requisição na API
  public search(): void {
    this.model = null;
    this.isSearchComplete = false;

    if (this.gridDirective != null) {
      this.gridDirective.data = null;
      this.gridDirective.itensSelecionados = [];
    }

    this.gridParamns.search == '' ? undefined : this.gridParamns.search;

    // if (this.gridOptions.apiServiceData != null) {
    //   this.http
    //     .get<any>(this.gridOptions.apiServiceData, {
    //       orderBy: this.orderBy,
    //       orderType: this.orderType,
    //       search: this.gridParamns.search,
    //       pageCurrent: this.pageCurrent,
    //       qtdRegistros: this.qtdRegistros,
    //     })
    //     .subscribe((resp:any) => {
    //       var result = resp.result;
    //       //Dados tratados
    //       // this.model = this.gridDirective.onSearch(result);
    //       this.pageTotal = Math.ceil((<any>result).total / this.qtdRegistros);
    //       this.total = (<any>result).total;

    //       //onBenforeData
    //       if (this.gridOptions.onBenforeData != null)
    //         this.gridOptions.onBenforeData(this.model);
    //       //onAfterData
    //       else if (this.gridOptions.onAfterData != null)
    //         this.gridOptions.onAfterData(this.model);
    //     },x => {
    //       //onError
    //       if (this.gridOptions.onError != null) this.gridOptions.onError(x);
    //       else {
    //         this.gridOptions.onError(<Error[]>x.data.main.errors);
    //         var error = <Error[]>x.data.main.errors;
    //         error.forEach((error) => {
    //           // alert(error.exception.Message);
    //         });
    //       }
    //     });
    // } else {
    this.http
      .get(this.gridOptions.apiServiceHttp, {
        params: {
          orderBy: this.orderBy,
          orderType: this.orderType,
          search: this.gridParamns.search,
          pageCurrent: String(this.pageCurrent),
          qtdRegistros: String(this.qtdRegistros),
        },
      })
      .subscribe(
        (resp:RetornoPadrao<any>) => {
          var result = resp.result.data;
          //Dados tratados
          this.model = this.gridDirective.onSearch(result);
          this.pageTotal = Math.floor(resp.result.total / this.qtdRegistros);
          this.total = resp.result.total;

          //onBenforeData
          if (this.gridOptions.onBenforeData != null)
            this.gridOptions.onBenforeData(this.model);
          //onAfterData
          else if (this.gridOptions.onAfterData != null)
            this.gridOptions.onAfterData(this.model);
        },
        (err) => {
          //onError
          if (this.gridOptions.onError != null) this.gridOptions.onError(err);
          else {
            this.gridOptions.onError(<Error[]>err.data.main.errors);
            var error = <Error[]>err.data.main.errors;
            error.forEach((error) => {
              // alert(error.exception.Message);
            });
          }
        },()=>{
            this.isSearchComplete = true;
        }
      );
  }
}
