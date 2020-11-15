import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Arquivo extends EntidadeBase {
    arquivoId:number;
    nome:string;
    nomeOriginal:string;
    tipo:number;
    caminho:string;
    extensao:string;
}

export class ArquivoGrid extends Arquivo{
    statusGrid:string;
    tipoArquivoGrid:string;
    thumbGrid:string;
}
