import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Telefone extends EntidadeBase {
    telefoneId:string;
    ddd:number;
    nome:string;
    numero:number;
    tipo:any;
    usuarioId:number;
}

export class TelefoneGrid extends Telefone{
    statusGrid:string;
    tipoGrid:string;
}
