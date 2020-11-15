import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Bairro extends EntidadeBase {
    bairroId:number;
    nome:string;
    municipioId:number;
    ufId:number;
}

export class BairroGrid extends Bairro{
    statusGrid:string;
    municipioGrid:string;
    ufGrid:string;
}
