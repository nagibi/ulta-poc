import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Funcionalidade extends EntidadeBase {
    nome:string;
    descricao:string;
    funcionalidadeId:number;
}

export class FuncionalidadeGrid extends Funcionalidade{
    statusGrid:string;
}
