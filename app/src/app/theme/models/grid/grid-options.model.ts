import { GridColumn } from './grid-column.model';
import { Button, ButtonType } from 'src/app/core/models/button.model';

export class GridOptions {
    isCheckbox: boolean;
        isCheckboxAll: boolean;
        columns: GridColumn[]; //Lista de colunas
        // rowActions: Button[];
        actions: Button[];
        //sortable: boolean; //Vai ser ordenado?
        routeBase: string;
        apiServiceData: any; //Url para carregar os dados
        apiServiceHttp: string; //Url para carregar os dados
        apiServiceExport: string; //Url para carregar os dados
        onBenforeData: Function; //Antes de carregar
        onCompleteData: Function; //Depois de carregar os dados
        onAfterData: Function; //Depois de popular os dados
        onError: Function; //Error
        onSelectedItem: Function; //Item selecionado
        isControle: boolean;
        isPaginate: boolean=true;
        qtdRegistros: number;
        orderBy: string;
        orderType: string;
}
