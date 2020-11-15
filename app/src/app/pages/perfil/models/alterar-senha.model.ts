export class AlterarSenha {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;

  constructor(
    senhaAtual: string,
    novaSenha: string,
    confirmarNovaSenha: string
  ) {
    this.senhaAtual = senhaAtual;
    this.novaSenha = novaSenha;
    this.confirmarNovaSenha = confirmarNovaSenha;
  }
}
