import { EntidadeBase } from 'src/app/core/models/entidade-base.model';

export class Usuario extends EntidadeBase {
  token: string;
  arquivoId: number;
  nome: string;
  senha: string;
  confirmarSenha: string;
  email: string;
  grupoId: number;
  sexo: number;
  confirmacaoEmail: boolean;
  dataNascimento: any;
}

export class UsuarioAutenticado extends Usuario {
  autenticado: boolean;
  dataExpiracao: Date;
  arquivoCaminho: string;
  grupoNome: string;
  funcionalidades: string[];
  senha: string;
  confirmarSenha: string;
  blob: string;
  dataNascimento: Date;
}

export class UsuarioGrid extends Usuario {
  statusGrid:string;
  sexoGrid:string;
  grupoNome:string;
  confirmacaoEmailGrid: string;
}
