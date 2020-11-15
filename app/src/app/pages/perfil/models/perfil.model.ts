export enum Sexo{
    MASCULINO= "Masculino",
    FEMININO= "Feminino",
    OUTROS= "Outros ",
}

export class Perfil {
    nome:string;
    arquivoId:number;
    email:string;
    dataNascimento:any;
    sexo:Sexo;

    constructor(nome:string, email:string, dataNascimento:any, sexo?:Sexo){
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;

    }
}
