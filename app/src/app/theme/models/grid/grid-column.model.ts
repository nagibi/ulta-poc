import { Button, ButtonType } from 'src/app/core/models/button.model';

export class GridColumn {
    field: string;
    fakeField: string;
    title: string;
    label: string;
    align: string;
    width: string;
    sortable: boolean;
    sortableStr: string;
    sortableType: string = 'desc';
    isVisible: boolean = true;
    actions:Button[];
}
