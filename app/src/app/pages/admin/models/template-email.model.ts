import { EntidadeBase } from '../../../core/models/entidade-base.model';

export class TemplateEmail extends EntidadeBase {
    nome:string;
    conteudo:string;
    token:string;
    dataCriacaoInicial:Date;
    dataCriacaoFinal:Date;
    dataAtualizacaoInicial:Date;
    dataAtualizacaoFinal:Date;

}

export class TemplateEmailGrid extends TemplateEmail  {
    statusGrid:any;
}

