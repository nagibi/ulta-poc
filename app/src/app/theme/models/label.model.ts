export enum LabelType{
    DEFAULT= "label-default",
    SUCESS= "label-success",
    LIGHT_SUCESS= "label-light-success",
    PRIMARY= "label-primary",
    LIGHT_PRIMARY= "label-light-primary",
    WARNING= "label-warning ",
    LIGHT_WARNING= "label-light-warning ",
    SECONDARY= "label-secondary ",
    LIGHT_SECONDARY= "label-light-secondary ",
    DANGER= "label-danger",
    LIGHT_DANGER= "label-light-danger",
    INFO= "label-info ",
    LIGHT_INFO= "label-light-info ",
    SUCCESS= "label-success",
    LIGHT_SUCCESS= "label-light-success",
    DARK= "label-dark",
    LIGHT_DARK= "label-light-dark",
    LIGHT= "label-light ",
}

export class Label {
    type:LabelType;
    text:any;
    title:any;
    visible:boolean;
    html:string;

    constructor(){
    }
}
