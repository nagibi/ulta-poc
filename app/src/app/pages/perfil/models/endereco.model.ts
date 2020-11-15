import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Mapa{
    lat:any;
    lng:any;
    tipo:any;
    nome:any;
}

export class Endereco extends EntidadeBase {
    enderecoId:string;
    cep:number;
    logradouro:string;
    complemento:string;
    numero:number;
    tipo:any;
    bairro:any;
    bairroId:number;
    usuarioId:number;
    lat:any;
    lng:any;
    // mapa:Mapa;
    titulo:string;
    municipioId:number;
    ufId:number;
}

export class EnderecoGrid extends Endereco{
    statusGrid:string;
    bairroGrid:string;
    tipoGrid:string;
}
