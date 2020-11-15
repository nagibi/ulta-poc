import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var jQuery: any;
import * as moment from 'moment';
import { GridService } from '../../services/grid.service';
import { UtilService } from 'src/app/core/services/util.service';
import { GridItem } from '../../models/grid/grid-item';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  public checkAll: boolean;
  public selectAllLabel: string;
  public qtd: number = 10;
  public data: any[];
  public itensSelecionados: any[];
  public mensagens: any;
  editText:string;

  @Input() gridService: GridService;

  constructor(
    protected translateService: TranslateService,
    public utilsService: UtilService, 
    public router: Router) {
  }

  carregarGrid(){
    this.checkAll = false;
    this.itensSelecionados = [];
    // this.gridService = this.config;
    this.gridService.gridDirective = this;
    this.gridService.gridParamns.search = '';
    this.editText = this.gridService.gridOptions.routeBase && this.mensagens['MSG000175.descricao'];
    this.gridService.gridOptions.isPaginate =  this.gridService.gridOptions.isPaginate == null ? true : this.gridService.gridOptions.isPaginate ;
    // this.gridService.gridParamns.qtdRegister = !this.gridService.gridOptions.isPaginate ? -1 : this.qtd;
    this.gridService.gridOptions.columns.forEach((colum) => {
      colum.isVisible = colum.isVisible == undefined ? true : colum.isVisible;
      colum.title = this.mensagens['MSG000172.descricao'];
      colum.fakeField = colum.fakeField == null ? colum.field : colum.fakeField;
    });
  }
  ngOnInit() {
    this.translateService
      .get([
        'MSG000172.descricao',
        'MSG000175.descricao'
      ])
      .subscribe((mensagens) => {
        this.mensagens = mensagens;
        this.carregarGrid();
      });
  }

  private getProperty(json, path): any {
    var tokens = path.split('.');
    var obj = json;
    for (var i = 0; i < tokens.length; i++) {
      if (obj != null) obj = obj[tokens[i]];
    }
    return obj;
  }

  public onSearch(resp?: any): any {
    this.reset();
    this.data = resp;
    var value: any;
    var index = 0;
    this.data.forEach((item) => {
      index++;
      this.gridService.gridOptions.columns.forEach((colum) => {
        if (colum.field) {
          value = this.getProperty(item, colum.field);

          if (value != null) {
            
            if (isNaN(value) && !isNaN(Date.parse(value)) && (value.split('-')).length > 1){
              
              // value = moment(value.toString()).format('DD/MM/YYYY HH:mm');
              value = this.utilsService.getDate(value,'DD/MM/YYYY');
            }

            item[colum.field] = value;
            item.index = index;
          }
          
        }
      });

      item.checked = false;
    });

    
    return this.data;
  }

  //Reset

  public reset = function () {
    this.selectAllLabel = 'Selecionar Todos os registros';
    this.itensSelecionados.forEach((item) => {
      item.checked = false;
    });
    this.itensSelecionados = [];
    this.checkAll = false;
  };

  // renderField(obj: any, colum: GridColumn) {
  //   return colum.fakeField ? obj[colum.fakeField] : obj[colum.field];
  // }

  onToggleSelectItem(index: number) {
    
    var itemSelected: GridItem = <GridItem>new Object();
    itemSelected.model = this.data[index];

    var id: any = this.itensSelecionados.indexOf(itemSelected.model);
    var isOnSelectedItem = this.gridService.gridOptions.onSelectedItem != null;

    if (id > -1) {
      itemSelected.selected = false;
      Promise.all(this.itensSelecionados.splice(id, 1)).then(() => {
        if (isOnSelectedItem) {
          this.gridService.gridOptions.onSelectedItem(
            this.itensSelecionados,
            itemSelected.model
          );
        }
      });
    } else {
      itemSelected.selected = true;
      this.itensSelecionados.unshift(itemSelected.model);

      if (isOnSelectedItem) {
        this.gridService.gridOptions.onSelectedItem(
          this.itensSelecionados,
          itemSelected.model
        );
      }
    }
  }

  onSearchClick(value: string) {
    this.gridService.gridParamns.search = value;
    this.gridService.search();
  }

  onQtdRegistrosClick(value: any) {
    this.qtd = value == '-1' ? 'Todos' : value;
    this.gridService.qtdRegistrosChange(value);
  }

  onBtnPrevClick() {
    this.gridService.pagePrevChange();
  }

  onBtnNextClick() {
    this.gridService.pageNextChange();
  }

  rowClick(model: any) {
    if (this.gridService.gridOptions.routeBase != null) {
      //var id = this.$sce.getTrustedHtml(model.id);
      var id = model['id'];
      var url: string = '/' + this.gridService.gridOptions.routeBase + '/' + id;
      this.router.navigate([url]);
    }
  }

  selectAll(): void {

    var gridItem: GridItem = <GridItem>new Object();

    if (this.checkAll == false) {
      gridItem.itens = [];
      this.reset();
    } else {
      this.selectAllLabel = 'Deselecionar Todos os registros';
      this.data.forEach((item) => {
        item.checked = true;
      });
      this.itensSelecionados = Array.from(this.data);
      gridItem.itens = this.itensSelecionados;
    }
    if (this.gridService.gridOptions.onSelectedItem != null)
      this.gridService.gridOptions.onSelectedItem(gridItem.itens);
  }
}
