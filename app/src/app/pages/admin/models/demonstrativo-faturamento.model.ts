import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class DemonstrativoFaturamento extends EntidadeBase {
  data:Date;
  valor:number;
  codigo:number;
  descricao:string;
  demonstrativoId:number;
  documentoId:number;
}

export class DemonstrativoFaturamentoGrid extends DemonstrativoFaturamento {
  statusGrid: string;
  documentoGrid: string;
}

