import { EntidadeBase } from './entidade-base.model';

export class Arquivo extends EntidadeBase {
  nome: string;
  nomeOriginal: string;
  tipo: any;
  caminho: string;
  extensao: string;
}
