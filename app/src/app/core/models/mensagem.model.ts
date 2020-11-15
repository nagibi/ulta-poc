export class Mensagem {
  tipo: string;
  descricao: string;
  tipoInfo:string;
  config:any;

  constructor(tipo: string, descricao: string, tipoInfo:string, config:any) {
    this.tipo = tipo;
    this.descricao = descricao;
    this.tipoInfo = tipoInfo;
    this.config = config;
  }
}
