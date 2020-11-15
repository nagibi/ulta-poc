import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Grupo extends EntidadeBase {
  nome: string;
  grupoId: number;
}

export class GrupoGrid extends Grupo {
  statusGrid: string;
}

