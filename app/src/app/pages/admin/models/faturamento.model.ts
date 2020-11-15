import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Faturamento extends EntidadeBase {
  data:Date;
  valor:number;
  codigo:number;
  descricao:string;
  demonstrativoId:number;
  documentoId:number;
}

export class FaturamentoGrid extends Faturamento {
  statusGrid: string;
  documentoGrid: string;
}

