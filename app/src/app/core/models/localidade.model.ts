export class Cidade {
    ddd:number;
    ibge:number;
    nome:string;
}

export class Estado {
    sigla:string;
}

export class CepAberto {
    cidade:Cidade;
    estado:Estado;
    bairro:string;
    cep:string;
    logradouro:string;
    altitude:number;
    latitude:number;
    longitude:number;
}
