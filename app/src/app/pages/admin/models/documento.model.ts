import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Documento extends EntidadeBase {
  data:any;
  nome:string;
  nomeOriginal:string;
  tipo:number;
  caminho:string;
  extensao:string;
}

export class DocumentoGrid extends Documento {
  statusGrid: string;
  tipoGrid: string;
}

