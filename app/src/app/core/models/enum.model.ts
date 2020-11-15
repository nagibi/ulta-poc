export class Enum {
  descricao: string;
  nome: string;
  valor: any;

  constructor(descricao: string, valor?: any, nome?: string) {
    this.descricao = descricao;
    this.nome = nome;
    this.valor = valor;
  }
}
