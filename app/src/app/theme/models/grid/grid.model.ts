import { GridOptions } from './grid-options.model';
import { GridParamns } from './grid-paramns';

export interface Grid {
    create(gridOptions: GridOptions);
    search(): void;
    data: any;
    gridOptions: GridOptions;
    gridDirective: any;
    model: any;
    gridParamns: GridParamns;
    // export(api: string, tipo: string): void;
}
